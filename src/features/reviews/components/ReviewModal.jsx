import { useState } from 'react';
import { X } from 'lucide-react';
import StarRating from './StarRating';
import { useCreateReview, useUpdateReview, useDeleteReview } from '../hooks/useReviewActions';
import { reviewSchema } from '../../../lib/validators/reviewSchmeas';

function ReviewModal({ contractId, revieweeName, existingReview, onClose }) {
  const isEditing = !!existingReview;

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [error, setError] = useState('');

  const createReview = useCreateReview(contractId);
  const updateReview = useUpdateReview(contractId);
  const deleteReview = useDeleteReview(contractId);

  const activeMutation = isEditing ? updateReview : createReview;

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = reviewSchema.safeParse({ rating, comment: comment || undefined });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError('');

    activeMutation.mutate(
      { rating, comment: comment.trim() || undefined },
      { onSuccess: onClose }
    );
  };

  const handleDelete = () => {
    if (!window.confirm('Delete this review? This cannot be undone.')) return;
    deleteReview.mutate(undefined, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl border border-border w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-faint hover:text-ink transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 className="font-display text-lg font-bold text-ink mb-1">
          {isEditing ? 'Edit Your Review' : 'Leave a Review'}
        </h2>
        <p className="text-sm font-body text-muted mb-5">
          How was your experience working with {revieweeName || 'them'}?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-2 py-2">
            <StarRating value={rating} onChange={setRating} size={32} />
            {error && <p className="text-error text-xs">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-ink mb-1.5">
              Comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={1000}
              placeholder="Share details about your experience..."
              className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={activeMutation.isPending}
              className="flex-1 bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
            >
              {activeMutation.isPending
                ? 'Saving...'
                : isEditing
                ? 'Save Changes'
                : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-body font-medium text-muted hover:text-ink transition"
            >
              Cancel
            </button>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteReview.isPending}
              className="w-full text-center text-xs font-body font-medium text-error hover:underline pt-1 disabled:opacity-50"
            >
              {deleteReview.isPending ? 'Deleting...' : 'Delete review'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;