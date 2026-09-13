import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { proposalSchema } from '../../../lib/validators/ProposalSchemas';
import { useApplyToJob } from '../hooks/useApplyToJob';

const fieldClass =
  'w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition';

function ApplyModal({ jobId, onClose }) {
  const applyToJob = useApplyToJob();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(proposalSchema), mode: 'onBlur' });

  const onSubmit = (data) => {
    applyToJob.mutate(
      { ...data, jobId: Number(jobId) },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl border border-border w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-faint hover:text-ink transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 className="font-display text-xl font-bold text-ink mb-1">Submit a Proposal</h2>
        <p className="text-sm font-body text-muted mb-5">
          Tell the client why you're the right person for this project.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-body font-medium text-ink mb-1.5">
              Cover Letter
            </label>
            <textarea
              {...register('coverLetter')}
              rows={5}
              placeholder="Explain your relevant experience and how you'd approach this project..."
              className={fieldClass}
            />
            {errors.coverLetter && (
              <p className="text-error text-xs mt-1.5">{errors.coverLetter.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-body font-medium text-ink mb-1.5">
                Your Bid (₹)
              </label>
              <input
                type="number"
                {...register('bidAmount')}
                placeholder="e.g. 4500"
                className={fieldClass}
              />
              {errors.bidAmount && (
                <p className="text-error text-xs mt-1.5">{errors.bidAmount.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-ink mb-1.5">
                Delivery Date
              </label>
              <input type="date" {...register('deliveryDate')} className={fieldClass} />
              {errors.deliveryDate && (
                <p className="text-error text-xs mt-1.5">{errors.deliveryDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={applyToJob.isPending}
              className="flex-1 bg-linear-to-r from-[#7C3AED] to-[#EC4899] text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
            >
              {applyToJob.isPending ? 'Submitting...' : 'Submit Proposal'}
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

export default ApplyModal;