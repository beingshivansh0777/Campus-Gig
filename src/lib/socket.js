import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '../features/auth/authStore';

let stompClient = null;

const topicRegistry = new Map();   // conversationId -> { subscription, listeners }
const typingRegistry = new Map();
const readRegistry = new Map();

let pendingOnConnect = [];         // fns to run once connected (e.g. sendReadEvent fired too early)

const resubscribeAll = (client) => {
  const rebuild = (registry, suffix) => {
    registry.forEach((entry, conversationId) => {
      // ALWAYS recreate — any old subscription is tied to the dead connection
      entry.subscription = client.subscribe(
        `/topic/chat/${conversationId}${suffix}`,
        (frame) => {
          const body = JSON.parse(frame.body);
          entry.listeners.forEach((cb) => cb(body));
        },
      );
    });
  };

  rebuild(topicRegistry, '');
  rebuild(typingRegistry, '/typing');
  rebuild(readRegistry, '/read');
};

const ensureClient = () => {
  if (stompClient) return stompClient;

  const wsBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
  const token = useAuthStore.getState().token;

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(
        `${wsBaseUrl}/ws?token=${encodeURIComponent(token)}`
      ),

    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    resubscribeAll(stompClient);

    const queued = pendingOnConnect;
    pendingOnConnect = [];

    queued.forEach((fn) => fn(stompClient));
  };

  stompClient.activate();

  return stompClient;
};

const runWhenConnected = (fn) => {
  const client = ensureClient();

  if (client.connected) {
    fn(client);
  } else {
    pendingOnConnect.push(fn);
  }
};

const genericSubscribe = (
  registry,
  suffix,
  conversationId,
  callback
) => {
  const client = ensureClient();

  let entry = registry.get(conversationId);

  if (!entry) {
    entry = {
      subscription: null,
      listeners: new Set(),
    };

    registry.set(conversationId, entry);
  }

  entry.listeners.add(callback);

  if (client.connected && !entry.subscription) {
    entry.subscription = client.subscribe(
      `/topic/chat/${conversationId}${suffix}`,
      (frame) => {
        const body = JSON.parse(frame.body);
        entry.listeners.forEach((cb) => cb(body));
      },
    );
  }

  // if not connected yet, resubscribeAll() in onConnect will create it once ready

  return () => {
    entry.listeners.delete(callback);

    if (entry.listeners.size === 0) {
      entry.subscription?.unsubscribe();
      registry.delete(conversationId);
    }
  };
};

export const subscribeToConversation = (conversationId, callback) =>
  genericSubscribe(topicRegistry, '', conversationId, callback);

export const subscribeToTyping = (conversationId, callback) =>
  genericSubscribe(typingRegistry, '/typing', conversationId, callback);

export const subscribeToReadReceipts = (conversationId, callback) =>
  genericSubscribe(readRegistry, '/read', conversationId, callback);

export const sendChatMessage = (conversationId, text) => {
  runWhenConnected((client) => {
    client.publish({
      destination: `/app/chat/${conversationId}`,
      body: JSON.stringify({ message: text }),
    });
  });

  return true;
};

export const sendTypingEvent = (conversationId) => {
  runWhenConnected((client) => {
    client.publish({
      destination: `/app/chat/${conversationId}/typing`,
      body: '{}',
    });
  });
};

export const sendReadEvent = (conversationId) => {
  runWhenConnected((client) => {
    client.publish({
      destination: `/app/chat/${conversationId}/read`,
      body: '{}',
    });
  });
};