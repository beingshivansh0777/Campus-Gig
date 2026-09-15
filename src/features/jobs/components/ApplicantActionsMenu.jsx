import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Check, Star, X } from 'lucide-react';

function ApplicantActionsMenu({ onHire, onShortlist, onReject, disabled }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleAction = (fn) => {
    fn();
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="p-2 text-muted hover:text-ink border border-border rounded-lg hover:border-ink/30 disabled:opacity-50 transition"
        aria-label="Proposal actions"
      >
        <MoreVertical size={16} />
      </button>

      <div
        className={`absolute right-0 mt-2 w-44 bg-surface border border-border rounded-lg shadow-sm py-1 z-10 origin-top-right transition-all duration-150 ${
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
      >
        <button
          onClick={() => handleAction(onHire)}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-body font-medium text-primary hover:bg-primary/5 transition"
        >
          <Check size={14} /> Hire
        </button>
        {onShortlist && (
          <button
            onClick={() => handleAction(onShortlist)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-body font-medium text-amber hover:bg-amber/5 transition"
          >
            <Star size={14} /> Shortlist
          </button>
        )}
        <button
          onClick={() => handleAction(onReject)}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-body font-medium text-error hover:bg-error/5 transition"
        >
          <X size={14} /> Reject
        </button>
      </div>
    </div>
  );
}

export default ApplicantActionsMenu;