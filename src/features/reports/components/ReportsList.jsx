const statusStyles = {
  PENDING: 'bg-amber/10 text-amber',
  RESOLVED: 'bg-success/10 text-success',
  DISMISSED: 'bg-faint/10 text-faint',
};

function ReportsList({ reports, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse h-20 bg-border/30 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return <p className="text-sm font-body text-faint">No reports yet.</p>;
  }

  const filed = reports.filter((r) => r.filedByMe);
  const received = reports.filter((r) => !r.filedByMe);

  const ReportCard = ({ report }) => (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-1.5">
        <p className="font-body font-semibold text-sm text-ink">
          {report.jobTitle || 'Contract'} · {report.otherPartyName}
        </p>
        <span
          className={`text-xs font-body font-medium px-2 py-0.5 rounded-full shrink-0 ${
            statusStyles[report.reportStatus] || 'bg-faint/10 text-faint'
          }`}
        >
          {report.reportStatus}
        </span>
      </div>
      <p className="text-xs font-body text-muted mb-1.5">
        {report.reportReason?.replace(/_/g, ' ')}
      </p>
      {report.description && (
        <p className="text-sm font-body text-muted mb-1.5 line-clamp-2">{report.description}</p>
      )}
      {report.adminRemark && (
        <p className="text-xs font-body text-ink bg-background rounded-lg px-2.5 py-1.5 mb-1.5">
          Admin note: {report.adminRemark}
        </p>
      )}
      <p className="text-xs font-body text-faint">
        {new Date(report.createdAt).toLocaleDateString()}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-body font-semibold text-sm text-ink mb-3">Reports You've Filed</h3>
        {filed.length === 0 ? (
          <p className="text-sm font-body text-faint">No reports filed.</p>
        ) : (
          <div className="space-y-3">
            {filed.map((r) => <ReportCard key={r.id} report={r} />)}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-body font-semibold text-sm text-ink mb-3">Reports About You</h3>
        {received.length === 0 ? (
          <p className="text-sm font-body text-faint">No reports received.</p>
        ) : (
          <div className="space-y-3">
            {received.map((r) => <ReportCard key={r.id} report={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsList;