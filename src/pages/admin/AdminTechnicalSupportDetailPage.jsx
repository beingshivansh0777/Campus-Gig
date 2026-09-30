import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  LifeBuoy,
  User,
} from 'lucide-react';

import {
  useAdminTechnicalSupport,
  useUpdateTechnicalSupport,
} from '../../features/admin/hooks/useAdminAuth';

function AdminTechnicalSupportDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useAdminTechnicalSupport(id);

  const updateTechnicalSupport =
    useUpdateTechnicalSupport();

  const handleStatusUpdate = (status) => {
    updateTechnicalSupport.mutate({
      id,
      status,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-5 w-48 bg-border/40 rounded" />

        <div className="h-8 w-52 bg-border/40 rounded-lg" />

        <div className="bg-surface border border-border rounded-xl p-6 space-y-5">
          <div className="h-5 w-64 bg-border/40 rounded" />
          <div className="h-4 w-full bg-border/40 rounded" />
          <div className="h-4 w-5/6 bg-border/40 rounded" />
          <div className="h-20 w-full bg-border/40 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            navigate('/admin/technical-support')
          }
          className="inline-flex items-center gap-2 text-sm font-body text-muted hover:text-ink transition"
        >
          <ArrowLeft size={16} />
          Back to Technical Support
        </button>

        <div className="mt-6 bg-surface border border-border rounded-xl p-10 text-center">
          <LifeBuoy
            size={30}
            className="mx-auto text-muted mb-3"
          />

          <h2 className="font-display text-lg font-semibold text-ink">
            Technical issue not found
          </h2>

          <p className="text-sm text-muted font-body mt-1">
            The requested support issue could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const user = data.userResponseDTO;

  const reporterName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
    : '';

  const currentStatus = data.status;
  const isUpdating = updateTechnicalSupport.isPending;

  /*
   * Backend workflow:
   *
   * PENDING -> OPEN
   * OPEN -> IN_PROGRESS
   * IN_PROGRESS -> RESOLVED
   *
   * RESOLVED / CLOSED cannot be updated.
   */
  const nextStatus = {
    PENDING: 'OPEN',
    OPEN: 'IN_PROGRESS',
    IN_PROGRESS: 'RESOLVED',
  };

  const availableNextStatus = nextStatus[currentStatus];

  return (
    <div>
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          navigate('/admin/technical-support')
        }
        className="inline-flex items-center gap-2 text-sm font-body text-muted hover:text-ink transition"
      >
        <ArrowLeft size={16} />
        Back to Technical Support
      </button>

      {/* Header */}
      <div className="mt-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              Technical Issue
            </h1>

            <p className="text-sm text-muted font-body mt-1">
              Issue #{data.id}
            </p>
          </div>

          <StatusBadge status={currentStatus} />
        </div>
      </div>

      {/* Issue Details */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-display text-lg font-semibold text-ink">
            Issue Details
          </h2>
        </div>

        <div className="p-5 space-y-6">

          {/* Subject */}
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-muted mb-1">
              Subject
            </p>

            <p className="text-sm font-body text-ink">
              {data.subject || '-'}
            </p>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-muted mb-1">
              Description
            </p>

            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-sm font-body text-ink whitespace-pre-wrap leading-6">
                {data.description || '-'}
              </p>
            </div>
          </div>

          {/* Reported By */}
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-muted mb-2">
              Reported By
            </p>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User
                  size={17}
                  className="text-primary"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  {reporterName || 'Unknown User'}
                </p>

                {user?.email && (
                  <p className="text-xs text-muted font-body">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Created At */}
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-muted mb-1">
              Filed
            </p>

            <div className="flex items-center gap-2 text-sm text-ink font-body">
              <Clock
                size={15}
                className="text-muted"
              />

              {data.createdAt
                ? new Date(data.createdAt).toLocaleString()
                : '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Update Status */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden mt-6">
        <div className="p-5 border-b border-border">
          <h2 className="font-display text-lg font-semibold text-ink">
            Update Status
          </h2>

          <p className="text-sm text-muted font-body mt-1">
            Update the current status of this technical support issue.
          </p>
        </div>

        <div className="p-5">
          {currentStatus === 'RESOLVED' ? (
            <div>
              <p className="text-sm font-semibold text-ink">
                Issue Resolved
              </p>

              <p className="text-sm text-muted font-body mt-1">
                This technical support issue has been marked as resolved.
              </p>
            </div>
          ) : currentStatus === 'CLOSED' ? (
            <div>
              <p className="text-sm font-semibold text-ink">
                Issue Closed
              </p>

              <p className="text-sm text-muted font-body mt-1">
                Closed issues cannot be updated.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ink">
                  Change Status
                </p>

                <p className="text-sm text-muted font-body mt-1">
                  Current status: {formatStatus(currentStatus)}
                </p>
              </div>

              <select
                value=""
                onChange={(event) => {
                  const status = event.target.value;

                  if (status) {
                    handleStatusUpdate(status);
                  }
                }}
                disabled={isUpdating || !availableNextStatus}
                className="w-full sm:w-52 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body text-ink outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {isUpdating
                    ? 'Updating...'
                    : `Move to ${formatStatus(availableNextStatus)}`}
                </option>

                {availableNextStatus && (
                  <option value={availableNextStatus}>
                    {formatStatus(availableNextStatus)}
                  </option>
                )}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatStatus(status) {
  if (!status) return '-';

  return status.replace(/\_/g, ' ');
}

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold text-ink">
      {formatStatus(status)}
    </span>
  );
}

export default AdminTechnicalSupportDetailPage;

