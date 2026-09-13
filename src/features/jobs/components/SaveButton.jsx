import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import { useToggleBookmark } from '../hooks/useToggleBookmark';

function SaveJobButton({ jobId }) {
  const { data: bookmarks } = useBookmarks();
  const { save, remove } = useToggleBookmark();

  const isSaved = !!bookmarks?.some((b) => b.jobId === jobId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      remove.mutate(jobId);
    } else {
      save.mutate(jobId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={save.isPending || remove.isPending}
      className="p-1.5 text-faint hover:text-primary transition disabled:opacity-50"
      aria-label={isSaved ? 'Remove from saved' : 'Save job'}
    >
      {isSaved ? <BookmarkCheck size={16} className="text-primary" /> : <Bookmark size={16} />}
    </button>
  );
}

export default SaveJobButton;