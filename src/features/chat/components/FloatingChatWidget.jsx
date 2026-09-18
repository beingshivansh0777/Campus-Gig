import { useState } from "react";

import { MessageCircle, X } from "lucide-react";

import ChatWindow from "./ChatWindow";

import { useConversationMessages } from "../hooks/useConversationMessages";

import { useChatSocket } from "../hooks/useChatSocket";

import { useAuthStore } from "../../auth/authStore";

function FloatingChatWidget({

  conversationId,

  otherPartyName,

  otherPartyAvatar,

}) {

  const [open, setOpen] = useState(false);

  const { data: history } = useConversationMessages(conversationId);

  const { messages } = useChatSocket(conversationId, history, open);

  const user = useAuthStore((state) => state.user);

  // Unread = messages not sent by me and not yet marked read

  const unreadCount = open

    ? 0

    : messages.filter((m) => !m.isMine && !m.read).length;

  if (!conversationId) return null;

  return (

    <>

      {/* Floating trigger button */}

      <button

        onClick={() => setOpen((o) => !o)}

        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent-pink text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"

        aria-label="Toggle chat"

      >

        {open ? <X size={22} /> : <MessageCircle size={22} />}

        {unreadCount > 0 && (

          <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">

            {unreadCount > 9 ? "9+" : unreadCount}

          </span>

        )}

      </button>

      {/* Slide-up panel */}

      <div

        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 transition-all duration-200 origin-bottom-right ${

          open

            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"

            : "opacity-0 scale-95 translate-y-2 pointer-events-none"

        }`}

      >

        <div className="bg-surface border border-border rounded-xl shadow-xl overflow-hidden">

          <div className="bg-ink text-white px-4 py-3 flex items-center justify-between">

            <div className="flex items-center gap-2">

              {otherPartyAvatar ? (

                <img

                  src={otherPartyAvatar}

                  alt={otherPartyName}

                  className="w-8 h-8 rounded-full object-cover"

                />

              ) : (

                <div className="w-8 h-8 rounded-full bg-primary/60 flex items-center justify-center text-xs font-semibold">

                  {otherPartyName?.[0]?.toUpperCase() ?? "?"}

                </div>

              )}

              <p className="font-body font-semibold text-sm">

                {otherPartyName || "Chat"}

              </p>

            </div>

            <button onClick={() => setOpen(false)} aria-label="Close chat">

              <X size={16} />

            </button>

          </div>

          <ChatWindow conversationId={conversationId} compact open={open} />

        </div>

      </div>

    </>

  );

}

export default FloatingChatWidget;