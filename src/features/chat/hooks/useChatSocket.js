import { useEffect, useState, useRef } from "react";
import {
  subscribeToConversation,
  sendChatMessage,
  subscribeToTyping,
  sendTypingEvent,
  sendReadEvent,
  subscribeToReadReceipts,
} from "../../../lib/socket";
import { useAuthStore } from "../../auth/authStore";

export const useChatSocket = (
  conversationId,
  initialMessages,
  active = true,
) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [typingUser, setTypingUser] = useState(null);
  const typingTimeoutRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const seenIds = useRef(new Set());
  useEffect(() => {
    if (!initialMessages) return;
    setMessages(initialMessages);
    seenIds.current = new Set(initialMessages.map((m) => m.id).filter(Boolean));
  }, [initialMessages]);

  // Mark conversation as read only when chat is actually open

  useEffect(() => {
    if (!conversationId || !active) return;
    sendReadEvent(conversationId);
  }, [conversationId, active, messages.length]);

  // Listen for the other user reading this conversation

  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = subscribeToReadReceipts(
      conversationId,
      ({ readByUserId }) => {
        if (Number(readByUserId) === Number(user?.id)) return;

        setMessages((prev) =>
          prev.map((m) =>
            Number(m.senderId) === Number(user?.id) ? { ...m, read: true } : m,
          ),
        );
      },
    );

    return unsubscribe;
  }, [conversationId, user?.id]);

  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = subscribeToConversation(
      conversationId,
      (newMessage) => {
        setMessages((prev) => {
          if (newMessage.id && seenIds.current.has(newMessage.id)) {
            return prev;
          }

          if (newMessage.id) {
            seenIds.current.add(newMessage.id);
          }

          const isOwn = Number(newMessage.senderId) === Number(user?.id);

          if (isOwn) {
            const pendingIdx = prev.findIndex(
              (m) => m._pending && m.message === newMessage.message,
            );

            if (pendingIdx !== -1) {
              const updated = [...prev];

              updated[pendingIdx] = newMessage;

              return updated;
            }
          }

          return [...prev, newMessage];
        });
      },
    );

    return unsubscribe;
  }, [conversationId]);

  // Subscribe to typing events

  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = subscribeToTyping(conversationId, (event) => {
      if (Number(event.senderId) === Number(user?.id)) return;

      setTypingUser(event.senderName);

      clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser(null);
      }, 3000);
    });

    return unsubscribe;
  }, [conversationId, user?.id]);

  const sendMessage = (text) => {
    const tempId = `temp-${Date.now()}`;

    const optimisticMsg = {
      id: tempId,
      senderId: user?.id,
      message: text,
      sentAt: new Date().toISOString(),
      isMine: true,
      _pending: true,
    };

    setMessages((prev) => [...prev, optimisticMsg]);

    const sent = sendChatMessage(conversationId, text);

    if (!sent) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  const notifyTyping = () => sendTypingEvent(conversationId);
  const messagesWithOwnership = messages.map((m) => ({
    ...m,
    isMine: user?.id != null && Number(m.senderId) === Number(user.id),
  }));

  return {
    messages: messagesWithOwnership,
    sendMessage,
    typingUser,
    notifyTyping,
  };
};
