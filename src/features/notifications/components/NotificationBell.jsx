import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

import { useNotifications } from "../hooks/useNotifications";
import NotificationPanel from "./NotificationPanel";

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
  } = useNotifications();

  // Close notification panel when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen]);

  // Open / close notification panel
  // IMPORTANT:
  // Opening the bell does NOT mark notifications as read.
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="relative"
      ref={wrapperRef}
    >
      <button
        onClick={handleToggle}
        className="relative flex items-center justify-center w-10 h-10 rounded-lg text-muted hover:bg-background hover:text-primary transition-all duration-200"
        aria-label="Notifications"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-error text-white text-[10px] font-bold min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50">
          <NotificationPanel
            notifications={notifications}
            isLoading={isLoading}
            onClose={() => setIsOpen(false)}
            onMarkAsRead={markAsRead}
          />
        </div>
      )}
    </div>
  );
}

export default NotificationBell;