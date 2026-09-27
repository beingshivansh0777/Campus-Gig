import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

const REFERENCE_ROUTES = {
  NEW_PROPOSAL: (id) => `/jobs/manage/${id}`,
  CONTRACT_CREATED: (id) => `/contracts/${id}`,
  CONTRACT_STARTED: (id) => `/contracts/${id}`,
  NEW_MESSAGE: () => null,
  PROGRESS_UPDATED: (id) => `/contracts/${id}`,
  CONTRACT_COMPLETED: (id) => `/contracts/${id}`,
  NEW_REVIEW: (id) => `/contracts/${id}`,
  CONTRACT_CANCELLED: (id) => `/contracts/${id}`,
  JOB_STATUS_CHANGED: (id) => `/jobs/manage/${id}`,
};

function NotificationItem({
  notification,
  onMarkAsRead,
  onClose,
}) {
  const routeFn = REFERENCE_ROUTES[notification.type];

  const to =
    routeFn && notification.referenceId
      ? routeFn(notification.referenceId)
      : null;

  const handleClick = () => {
    // Mark notification as read only if it is unread
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }

    // Close notification panel
    onClose();
  };

  const content = (
    <div
      className={`
        px-4 py-3
        border-b border-border
        last:border-b-0
        transition-colors duration-200
        ${
          !notification.isRead
            ? "bg-primary/5"
            : "bg-surface"
        }
        hover:bg-background
      `}
    >
      <div className="flex items-start gap-3">

        {/* Fixed space for unread dot */}
        <div className="w-1.5 shrink-0 flex justify-center">
          {!notification.isRead && (
            <span
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-primary
                mt-1.5
                shrink-0
              "
            />
          )}
        </div>

        {/* Notification content */}
        <div className="min-w-0 flex-1">
          <p className="font-body font-semibold text-sm text-ink">
            {notification.title}
          </p>

          <p className="text-xs font-body text-muted mt-0.5 line-clamp-2">
            {notification.message}
          </p>

          <p className="text-xs font-body text-faint mt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );

  // Notification has a destination
  if (to) {
    return (
      <Link
        to={to}
        onClick={handleClick}
        className="block"
      >
        {content}
      </Link>
    );
  }

  // Notification doesn't have a destination
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
    >
      {content}
    </div>
  );
}

function NotificationPanel({
  notifications,
  isLoading,
  onClose,
  onMarkAsRead,
}) {
  return (
    <div
      className="
        absolute
        right-0
        mt-2
        w-80
        bg-surface
        border
        border-border
        rounded-lg
        shadow-sm
        max-h-96
        overflow-y-auto
      "
    >
      {/* Header */}
      <div
        className="
          px-4
          py-3
          border-b
          border-border
          sticky
          top-0
          bg-surface
          z-10
        "
      >
        <p className="font-body font-semibold text-sm text-ink">
          Notifications
        </p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                animate-pulse
                h-12
                bg-border/30
                rounded-lg
              "
            />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        /* Empty State */
        <div className="px-4 py-8 text-center">
          <Bell
            size={24}
            className="text-faint mx-auto mb-2"
          />

          <p className="text-sm font-body text-faint">
            No notifications yet.
          </p>
        </div>
      ) : (
        /* Notifications */
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onClose={onClose}
          />
        ))
      )}
    </div>
  );
}

export default NotificationPanel;
