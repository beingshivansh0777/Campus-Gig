import { useParams } from 'react-router-dom';
import { useAdminJob } from '../../features/admin/hooks/useAdminEntities';

function AdminJobDetailPage() {
  const { id } = useParams();
  const { data: job, isLoading } = useAdminJob(id);

  if (isLoading) return <div className="animate-pulse h-64 bg-border/30 rounded-xl" />;
  if (!job) return <p className="text-sm font-body text-muted">Not found.</p>;

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">{job.title}</h1>
      <p className="text-sm font-body text-muted mb-6">
        Posted by {job.clientResponseDTO?.firstName} {job.clientResponseDTO?.lastName}
      </p>
      <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body">
        <p className="whitespace-pre-line">{job.description}</p>
        <p><span className="text-muted">Budget:</span> ₹{job.budget}</p>
        <p><span className="text-muted">Deadline:</span> {new Date(job.deadline).toLocaleDateString()}</p>
        <p><span className="text-muted">Category:</span> {job.category?.replace(/_/g, ' ')}</p>
        <p><span className="text-muted">Experience:</span> {job.experience}</p>
        <p><span className="text-muted">Status:</span> {job.jobStatus}</p>
      </div>
    </div>
  );
}

export default AdminJobDetailPage;