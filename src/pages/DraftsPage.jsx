import { Link } from 'react-router-dom';
import { Trash2, Pencil } from 'lucide-react';
import { useDrafts } from '../features/jobs/hooks/useDrafts';
import { useDeleteDraft } from '../features/jobs/hooks/useDeleteDraft';

function DraftsPage() {
  const { data: drafts, isLoading } = useDrafts();
  const deleteDraft = useDeleteDraft();

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Your Drafts</h1>
        <Link
          to="/jobs/create"
          className="text-sm font-body font-semibold text-primary hover:underline"
        >
          + New Project
        </Link>
      </div>

      {!drafts || drafts.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted">No drafts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {drafts.map((draft) => (
            <div
              key={draft.draftId}
              className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-body font-semibold text-sm text-ink truncate">
                  {draft.title || 'Untitled draft'}
                </p>
                <p className="text-xs font-body text-muted mt-0.5">
                  {draft.jobCategory?.replace(/_/g, ' ') || 'No category yet'}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/jobs/drafts/${draft.draftId}`}
                  className="p-2 text-muted hover:text-primary transition"
                  aria-label="Edit draft"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => deleteDraft.mutate(draft.draftId)}
                  className="p-2 text-muted hover:text-error transition"
                  aria-label="Delete draft"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DraftsPage;