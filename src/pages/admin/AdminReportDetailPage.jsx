import { useParams } from 'react-router-dom';
import { useAdminReport } from '../../features/admin/hooks/useAdminEntities';
import AdminBackButton from '../../features/admin/components/AdminBackButton';

function AdminReportDetailPage() {
  const { id } = useParams();
  const { data: report, isLoading } = useAdminReport(id);

  if (isLoading) return <div className="animate-pulse h-64 bg-border/30 rounded-xl" />;
  if (!report) return <p className="text-sm font-body text-muted">Not found.</p>;

  return (
    <div className="max-w-lg">
      <AdminBackButton />
      <h1 className="font-display text-2xl font-bold text-ink mb-1">
        {report.reason?.replace(/_/g, ' ')}
      </h1>
      <span className="inline-block text-xs font-body font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-6">
        {report.reportStatus}
      </span>

      <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body mb-4">
        <p className="whitespace-pre-line"><span className="text-muted">Description:</span> {report.description}</p>
        <p><span className="text-muted">Filed by:</span> {report.actionInitiatedBy}</p>
        <p><span className="text-muted">Filed on:</span> {new Date(report.createdAt).toLocaleDateString()}</p>
        {report.resolvedAt && (
          <p><span className="text-muted">Resolved on:</span> {new Date(report.resolvedAt).toLocaleDateString()}</p>
        )}
        {report.adminRemark && (
          <p className="whitespace-pre-line"><span className="text-muted">Admin remark:</span> {report.adminRemark}</p>
        )}
      </div>

      {report.contractResponseDTO && (
        <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body">
          <h2 className="font-body font-semibold text-ink mb-2">Related Contract</h2>
          <p><span className="text-muted">Amount:</span> ₹{report.contractResponseDTO.agreementAmount}</p>
          <p><span className="text-muted">Status:</span> {report.contractResponseDTO.contractStatus}</p>
          <p><span className="text-muted">Progress:</span> {report.contractResponseDTO.progressStatus}</p>
        </div>
      )}

      <p className="text-xs font-body text-faint mt-4 italic">
        Resolution actions aren't available yet — ask your backend to add an endpoint for updating report status.
      </p>
    </div>
  );
}

export default AdminReportDetailPage;