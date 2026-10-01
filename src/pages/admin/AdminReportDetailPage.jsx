import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAdminReport,
  useUpdateAdminReport,
} from '../../features/admin/hooks/useAdminEntities';
import AdminBackButton from '../../features/admin/components/AdminBackButton';

function AdminReportDetailPage() {
  const { id } = useParams();

  const { data: report, isLoading } = useAdminReport(id);

  const updateReportMutation = useUpdateAdminReport();

  const [selectedStatus, setSelectedStatus] = useState('');

  const currentStatus = selectedStatus || report?.reportStatus || '';

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdate = () => {
    if (!currentStatus || currentStatus === report.reportStatus) {
      return;
    }

    updateReportMutation.mutate(
      {
        id,
        status: currentStatus,
      },
      {
        onSuccess: () => {
          setSelectedStatus('');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="animate-pulse h-64 bg-border/30 rounded-xl" />
    );
  }

  if (!report) {
    return (
      <p className="text-sm font-body text-muted">
        Not found.
      </p>
    );
  }

  const hasChanges =
    currentStatus !== report.reportStatus;

  return (
    <div className="max-w-lg">
      <AdminBackButton />

      <h1 className="font-display text-2xl font-bold text-ink mb-1">
        {report.reason?.replace(/\_/g, ' ')}
      </h1>

      <span className="inline-block text-xs font-body font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-6">
        {report.reportStatus}
      </span>

      {/* Report Details */}
      <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body mb-4">
        <p className="whitespace-pre-line">
          <span className="text-muted">Description:</span>{' '}
          {report.description}
        </p>

        <p>
          <span className="text-muted">Filed by:</span>{' '}
          {report.actionInitiatedBy}
        </p>

        <p>
          <span className="text-muted">Filed on:</span>{' '}
          {new Date(report.createdAt).toLocaleDateString()}
        </p>

        {report.resolvedAt && (
          <p>
            <span className="text-muted">Resolved on:</span>{' '}
            {new Date(report.resolvedAt).toLocaleDateString()}
          </p>
        )}

        {report.adminRemark && (
          <p className="whitespace-pre-line">
            <span className="text-muted">Admin remark:</span>{' '}
            {report.adminRemark}
          </p>
        )}
      </div>

      {/* Related Contract */}
      {report.contractResponseDTO && (
        <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body mb-4">
          <h2 className="font-body font-semibold text-ink mb-2">
            Related Contract
          </h2>

          <p>
            <span className="text-muted">Amount:</span>{' '}
            ₹{report.contractResponseDTO.agreementAmount}
          </p>

          <p>
            <span className="text-muted">Status:</span>{' '}
            {report.contractResponseDTO.contractStatus}
          </p>

          <p>
            <span className="text-muted">Progress:</span>{' '}
            {report.contractResponseDTO.progressStatus}
          </p>
        </div>
      )}

      {/* Report Action */}
      <div className="bg-surface border border-border rounded-xl p-5 mt-4">
        <h2 className="font-body font-semibold text-ink mb-3">
          Action
        </h2>

        <div className="flex items-center gap-3">
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            disabled={updateReportMutation.isPending}
            className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-surface text-sm font-body text-ink outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="PENDING">Pending</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={
              !hasChanges ||
              updateReportMutation.isPending
            }
            className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-body font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {updateReportMutation.isPending
              ? 'Updating...'
              : 'Update'}
          </button>
        </div>

        {hasChanges && !updateReportMutation.isPending && (
          <p className="text-xs font-body text-muted mt-2">
            Select a status and click Update to save the change.
          </p>
        )}

        {updateReportMutation.isError && (
          <p className="text-xs font-body text-red-500 mt-2">
            Failed to update report status. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminReportDetailPage;