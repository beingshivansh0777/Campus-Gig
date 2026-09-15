import { useEffect, useRef, useState } from "react";
import { getStompClient } from "../../../lib/socket";
import { useAuthStore } from "../../auth/authStore";

export const useChatSocket = (conversationId, initialMessages = []) => {
  const [messages, setMessages] = useState(() => initialMessages);
  const subscriptionRef = useRef(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!initialMessages) return;

    setMessages((currentMessages) => {
      // Avoid unnecessary state updates when the same history is received again
      if (currentMessages === initialMessages) {
        return currentMessages;
      }

      return initialMessages;
    });
  }, [initialMessages]);

  useEffect(() => {
    if (!conversationId) return;

    const client = getStompClient();

    const subscribeToTopic = () => {
      if (!client.connected) return;

      subscriptionRef.current?.unsubscribe();

      subscriptionRef.current = client.subscribe(
        `/topic/chat/${conversationId}`,
        (frame) => {
          const newMessage = JSON.parse(frame.body);

          setMessages((prev) => [...prev, newMessage]);
        }
      );
    };

    if (client.connected) {
      subscribeToTopic();
    } else {
      client.onConnect = subscribeToTopic;

      if (!client.active) {
        client.activate();
      }
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
    };
  }, [conversationId]);

  const sendMessage = (text) => {
    const client = getStompClient();

    if (!client.connected) return;

    client.publish({
      destination: `/app/chat/${conversationId}`,
      body: JSON.stringify({
        message: text,
      }),
    });

    setMessages((prev) => [
      ...prev,
      {
        message: text,
        senderId: user?.id,
        sentAt: new Date().toISOString(),
        _optimistic: true,
      },
    ]);
  };

  return {
    messages,
    sendMessage,
  };
};