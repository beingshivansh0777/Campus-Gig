import { useState } from 'react';
import { X } from 'lucide-react';
import { useBreakContract } from '../hooks/useContractActions';


const CANCEL_REASONS = [
  'WORK_NO_LONGER_REQUIRED',
  'CHANGE_IN_REQUIREMENT',
  'PAYMENT_ISSUE',
  'UNABLE_TO_COMPLETE',
  'PERSONAL_REASON',
  'OTHER',
];

function BreakContractModal({ contractId, onClose }) {
  const [reason, setReason] = useState('');
  const [remark, setRemark] = useState('');
  const breakContract = useBreakContract(contractId);

  const handleSubmit = (e) => {
    e.preventDefault();
    breakContract.mutate({ reason, remark }, { onSuccess: onClose });
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

        <h2 className="font-display text-lg font-bold text-ink mb-5">Cancel Contract</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-body font-medium text-ink mb-1.5">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            >
              <option value="">Select a reason</option>
              {CANCEL_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-ink mb-1.5">
              Additional Remarks
            </label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows={3}
              minLength={10}
              required
              placeholder="Explain what happened (minimum 10 characters)..."
              className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={breakContract.isPending}
              className="flex-1 bg-error text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
            >
              {breakContract.isPending ? 'Submitting...' : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-body font-medium text-muted hover:text-ink transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BreakContractModal;