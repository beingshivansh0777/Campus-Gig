import { Lock } from 'lucide-react';

function RoleRestrictedModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 z-70">
      <div className="bg-surface rounded-xl border border-border w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <Lock size={20} />
        </div>
        <h2 className="font-display text-lg font-bold text-ink mb-2">Feature Not Available</h2>
        <p className="text-sm font-body text-muted leading-relaxed mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-primary text-white font-body font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-primary-hover transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default RoleRestrictedModal;