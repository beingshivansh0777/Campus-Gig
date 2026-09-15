import { Link } from 'react-router-dom';
import { useAllReceivedProposals } from '../features/jobs/hooks/useAllReceivedProposals';

function ReceivedProposalsPage() {
  const { data: proposals, isLoading, isError } = useAllReceivedProposals();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Proposals Received</h1>
      <p className="font-body text-sm text-muted mb-6">
        All new proposals submitted across your posted projects.
      </p>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-border/30 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted">Couldn't load proposals. Try again.</p>
        </div>
      ) : proposals.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted mb-3">No proposals received yet.</p>
          <Link to="/jobs/create" className="text-sm font-body font-semibold text-primary hover:underline">
            Post a project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {proposals.map((p, i) => (
            <Link
              key={i}
              to={`/jobs/manage/${p.jobId}`}
              className="block bg-surface border border-border rounded-xl p-4 hover:border-primary/30 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-body text-faint mb-1">For: {p.jobTitle}</p>
                  <p className="font-body font-semibold text-sm text-ink">
                    {p.gigResponseDTO?.gigFirstName} {p.gigResponseDTO?.gigLastName}
                  </p>
                  <p className="text-sm font-body text-muted mt-1 line-clamp-2">
                    {p.coverLetter}
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-ink shrink-0">
                  ₹{p.bidAmount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReceivedProposalsPage;