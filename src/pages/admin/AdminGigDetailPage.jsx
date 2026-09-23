import { useParams } from 'react-router-dom';
import { useAdminGig } from '../../features/admin/hooks/useAdminEntities';
import AdminBackButton from '../../features/admin/components/AdminBackButton';

function AdminGigDetailPage() {
  const { id } = useParams();
  const { data: gig, isLoading } = useAdminGig(id);

  if (isLoading) return <div className="animate-pulse h-64 bg-border/30 rounded-xl" />;
  if (!gig) return <p className="text-sm font-body text-muted">Not found.</p>;

  return (
    <div className="max-w-lg">
      <AdminBackButton />
      <h1 className="font-display text-2xl font-bold text-ink mb-1">{gig.title}</h1>
      <p className="text-sm font-body text-muted mb-6">
        {gig.owner?.firstName} {gig.owner?.lastName} · {gig.owner?.email}
      </p>
      <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm font-body mb-4">
        <p><span className="text-muted">College:</span> {gig.college}</p>
        <p><span className="text-muted">Department:</span> {gig.department}</p>
        <p><span className="text-muted">Semester:</span> {gig.semester}</p>
        <p><span className="text-muted">Category:</span> {gig.category?.replace(/_/g, ' ')}</p>
        <p><span className="text-muted">Status:</span> {gig.availabilityStatus}</p>
        <p className="whitespace-pre-line"><span className="text-muted">About:</span> {gig.description}</p>
      </div>
      {gig.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {gig.skills.map((s) => (
            <span key={s} className="bg-primary/10 text-primary text-xs font-body font-medium px-2.5 py-1 rounded-full">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminGigDetailPage;