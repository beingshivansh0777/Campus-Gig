import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useAuthStore } from "../../auth/authStore";
import { useConversationMessages } from "../hooks/useConversationMessages";
import { useChatSocket } from "../hooks/useChatSocket";

function ChatWindow({ conversationId }) {
  const { data: history, isLoading } = useConversationMessages(conversationId);

  const initialMessages = history ?? [];

  const { messages, sendMessage } = useChatSocket(
    conversationId,
    initialMessages,
  );
  
  const [input, setInput] = useState("");
  const user = useAuthStore((state) => state.user);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-border/30 rounded-xl" />;
  }

  return (
    <div className="bg-surface border border-border rounded-xl flex flex-col h-96">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm font-body text-faint text-center mt-10">
            No messages yet. Say hello!
          </p>
        ) : (
          messages.map((msg, i) => {
            const isMine = msg.senderId === user?.id;
            return (
              <div
                key={msg.id ?? `local-${i}`}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-xl px-3 py-2 text-sm font-body ${
                    isMine
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-background text-ink rounded-bl-sm"
                  }`}
                >
                  <p>{msg.message}</p>
                  <p
                    className={`text-[10px] mt-1 ${isMine ? "text-white/60" : "text-faint"}`}
                  >
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-border bg-background rounded-lg px-3 py-2 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-primary text-white p-2 rounded-lg hover:bg-primary-hover disabled:opacity-40 transition"
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
