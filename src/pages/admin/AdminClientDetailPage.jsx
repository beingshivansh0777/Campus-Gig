import { useParams } from 'react-router-dom';
import { useAdminClient } from '../../features/admin/hooks/useAdminEntities';

function AdminClientDetailPage() {
  const { id } = useParams();
  const { data: client, isLoading } = useAdminClient(id);

  if (isLoading) return <div className="animate-pulse h-64 bg-border/30 rounded-xl" />;
  if (!client) return <p className="text-sm font-body text-muted">Not found.</p>;

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">
        {client.firstName} {client.lastName}
      </h1>
      <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body">
        <p><span className="text-muted">Email:</span> {client.email}</p>
        <p><span className="text-muted">Phone:</span> {client.phoneNumber}</p>
        <p><span className="text-muted">Verified:</span> {client.isVerified ? 'Yes' : 'No'}</p>
        <p><span className="text-muted">Rating:</span> {client.averageRating?.toFixed(1) ?? '—'}</p>
        <p><span className="text-muted">Joined:</span> {new Date(client.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default AdminClientDetailPage;