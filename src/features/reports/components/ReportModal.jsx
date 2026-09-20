import { useState } from 'react';
import { Flag, X } from 'lucide-react';
import { useCreateReport } from '../hooks/useCreateReport';
import { REPORT_REASONS } from '../../../lib/constants';

function ReportModal({ contractId, otherPartyName, onClose }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const createReport = useCreateReport();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reason) {
      setError('Please select a reason');
      return;
    }
    setError('');

    createReport.mutate(
      { contractId: Number(contractId), reportReasonStatus: reason, description: description.trim() },
      { onSuccess: onClose }
    );
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

        <div className="flex items-center gap-2 mb-1">
          <Flag size={18} className="text-error" />
          <h2 className="font-display text-lg font-bold text-ink">Report an Issue</h2>
        </div>
        <p className="text-sm font-body text-muted mb-5">
          Let us know what went wrong with {otherPartyName || 'this contract'}. Our team will review it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-body font-medium text-ink mb-1.5">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            >
              <option value="">Select a reason</option>
              {REPORT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
            {error && <p className="text-error text-xs mt-1.5">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-ink mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe what happened..."
              className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={createReport.isPending}
              className="flex-1 bg-error text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
            >
              {createReport.isPending ? 'Submitting...' : 'Submit Report'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-body font-medium text-muted hover:text-ink transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportModal;