import { useParams } from 'react-router-dom';
import { useAdminJobApplication } from '../../features/admin/hooks/useAdminEntities';
import AdminBackButton from '../../features/admin/components/AdminBackButton';

function AdminJobApplicationDetailPage() {
  const { id } = useParams();
  const { data: app, isLoading } = useAdminJobApplication(id);

  if (isLoading) return <div className="animate-pulse h-64 bg-border/30 rounded-xl" />;
  if (!app) return <p className="text-sm font-body text-muted">Not found.</p>;

  return (
    <div className="max-w-lg">
      <AdminBackButton />
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Application Detail</h1>
      <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body mb-4">
        <p><span className="text-muted">Job:</span> {app.jobResponseDTO?.title}</p>
        <p><span className="text-muted">Applicant:</span> {app.gigResponseDTO?.gigFirstName} {app.gigResponseDTO?.gigLastName}</p>
        <p><span className="text-muted">Bid:</span> ₹{app.proposedAmount}</p>
        <p><span className="text-muted">Status:</span> {app.status}</p>
        <p><span className="text-muted">Applied:</span> {new Date(app.appliedAt).toLocaleDateString()}</p>
        <p className="whitespace-pre-line"><span className="text-muted">Cover Letter:</span> {app.coverLetter}</p>
      </div>
    </div>
  );
}

export default AdminJobApplicationDetailPage;