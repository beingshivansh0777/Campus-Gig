import StarRating from './StarRating';

function ReviewsList({ reviews, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse h-20 bg-border/30 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <p className="text-sm font-body text-faint">No reviews yet.</p>;
  }

  return (
    <div className="space-y-3">
      {reviews.map((review, i) => (
        <div key={i} className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="font-body font-semibold text-sm text-ink">{review.name}</p>
            <StarRating value={review.rating} readOnly size={14} />
          </div>
          {review.comment && (
            <p className="text-sm font-body text-muted mb-1.5">{review.comment}</p>
          )}
          <p className="text-xs font-body text-faint">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;