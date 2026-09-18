import { useState } from 'react';
import { Star } from 'lucide-react';

function StarRating({ value, onChange, readOnly = false, size = 24 }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = readOnly ? star <= value : star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className={readOnly ? 'cursor-default' : 'cursor-pointer'}
          >
            <Star
              size={size}
              className={filled ? 'fill-amber text-amber' : 'text-border'}
            />
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;