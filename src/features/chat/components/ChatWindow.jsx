import { useState, useRef, useEffect } from "react";

import { Send } from "lucide-react";

import { useConversationMessages } from "../hooks/useConversationMessages";

import { useChatSocket } from "../hooks/useChatSocket";

function ChatWindow({ conversationId, compact = false, open = true }) {

  const {
    data: history,
    isLoading,
    isError,
  } = useConversationMessages(conversationId);

  const { messages, sendMessage, typingUser, notifyTyping } = useChatSocket(
    conversationId,
    history,
    open,
  );

  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  const typingDebounceRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);

  const handleInputChange = (e) => {

    setInput(e.target.value);

    if (!typingDebounceRef.current) {

      notifyTyping();

      typingDebounceRef.current = setTimeout(() => {

        typingDebounceRef.current = null;

      }, 1500);

    }

  };

  const handleSend = (e) => {

    e.preventDefault();

    if (!input.trim()) return;

    sendMessage(input.trim());

    setInput("");

  };

  if (isLoading) {

    return (
      <div
        className={`animate-pulse ${compact ? "h-72" : "h-64"} bg-border/30 rounded-xl`}
      />
    );

  }

  if (isError) {

    return (
      <div
        className={`flex items-center justify-center ${compact ? "h-72" : "h-64"} px-4`}
      >
        <p className="text-sm font-body text-error text-center">
          Couldn't load messages. Try reopening the chat.
        </p>
      </div>
    );

  }

  return (

    <div
      className={`flex flex-col ${
        compact ? "h-80" : "h-96 bg-surface border border-border rounded-xl"
      }`}
    >

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.length === 0 ? (

          <p className="text-sm font-body text-faint text-center mt-10">
            No messages yet. Say hello!
          </p>

        ) : (

          messages.map((msg, i) => (

            <div
              key={msg.id ?? `local-${i}`}
              className={`flex ${
                msg.isMine ? "justify-end" : "justify-start"
              }`}
            >

              <div
                className={`max-w-[70%] rounded-xl px-3 py-2 text-sm font-body ${
                  msg.isMine
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-background text-ink rounded-bl-sm"
                }`}
              >

                <p>{msg.message}</p>

                <p
                  className={`text-[10px] mt-1 ${
                    msg.isMine ? "text-white/60" : "text-faint"
                  }`}
                >

                  {new Date(msg.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}

                  {msg.isMine && ` · ${msg.read ? "Read" : "Sent"}`}

                </p>

              </div>

            </div>

          ))

        )}

        {typingUser && (

          <p className="text-xs font-body text-faint px-1 italic">
            {typingUser} is typing…
          </p>

        )}

        <div ref={bottomRef} />

      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-border p-3"
      >

        <input
          value={input}
          onChange={handleInputChange}
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