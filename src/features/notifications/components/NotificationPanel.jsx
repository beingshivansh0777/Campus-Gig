import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const REFERENCE_ROUTES = {
  NEW_PROPOSAL: (id) => `/jobs/manage/${id}`,
  CONTRACT_CREATED: (id) => `/contracts/${id}`,
  CONTRACT_STARTED: (id) => `/contracts/${id}`,
  NEW_MESSAGE: () => null, // opens via floating chat widget on the contract page instead
  PROGRESS_UPDATED: (id) => `/contracts/${id}`,
  CONTRACT_COMPLETED: (id) => `/contracts/${id}`,
  NEW_REVIEW: (id) => `/contracts/${id}`,
  CONTRACT_CANCELLED: (id) => `/contracts/${id}`,
  JOB_STATUS_CHANGED: (id) => `/jobs/manage/${id}`,
};

function NotificationItem({ notification, onClick }) {
  const routeFn = REFERENCE_ROUTES[notification.type];
  const to = routeFn && notification.referenceId ? routeFn(notification.referenceId) : null;

  const content = (
    <div
      className={`px-4 py-3 border-b border-border last:border-b-0 hover:bg-background transition ${
        !notification.isRead ? 'bg-primary/5' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        {!notification.isRead && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />}
        <div className="min-w-0">
          <p className="font-body font-semibold text-sm text-ink">{notification.title}</p>
          <p className="text-xs font-body text-muted mt-0.5 line-clamp-2">{notification.message}</p>
          <p className="text-xs font-body text-faint mt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="block">
        {content}
      </Link>
    );
  }
  return content;
}

function NotificationPanel({ notifications, isLoading, onClose }) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-sm max-h-96 overflow-y-auto">
      <div className="px-4 py-3 border-b border-border sticky top-0 bg-surface">
        <p className="font-body font-semibold text-sm text-ink">Notifications</p>
      </div>

      {isLoading ? (
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-12 bg-border/30 rounded-lg" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <Bell size={24} className="text-faint mx-auto mb-2" />
          <p className="text-sm font-body text-faint">No notifications yet.</p>
        </div>
      ) : (
        notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} onClick={onClose} />
        ))
      )}
    </div>
  );
}

export default NotificationPanel;