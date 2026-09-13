import { Link } from 'react-router-dom';
import { BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../features/jobs/hooks/useBookmarks';
import { useToggleBookmark } from '../features/jobs/hooks/useToggleBookmark';
import { JOB_STATUS_LABELS } from '../lib/constants';

function SavedJobsPage() {
  const { data: bookmarks, isLoading } = useBookmarks();
  const { remove } = useToggleBookmark();

  const handleUnsave = (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();
    remove.mutate(jobId);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-20 bg-border/30 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Saved Jobs</h1>

      {!bookmarks || bookmarks.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted">No saved jobs yet.</p>
          <Link
            to="/jobs"
            className="text-sm font-body font-semibold text-primary hover:underline mt-2 inline-block"
          >
            Browse open projects
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((b) => (
            <Link
              key={b.jobId}
              to={`/jobs/${b.jobId}`}
              className="block bg-surface border border-border rounded-xl p-4 hover:border-primary/30 transition"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-body font-semibold text-sm text-ink">{b.jobTitle}</p>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-body text-faint">
                    {JOB_STATUS_LABELS[b.jobStatus] || b.jobStatus}
                  </span>
                  <button
                    onClick={(e) => handleUnsave(e, b.jobId)}
                    disabled={remove.isPending}
                    className="text-primary hover:text-primary-hover transition disabled:opacity-50"
                    aria-label="Remove from saved"
                  >
                    <BookmarkCheck size={18} className="fill-primary" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs font-body text-faint">
                <span className="font-mono">₹{b.budget}</span>
                <span>·</span>
                <span>{b.category?.replace(/_/g, ' ')}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobsPage;