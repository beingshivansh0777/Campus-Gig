import { Link } from 'react-router-dom';
import { CONTRACT_STATUS_LABELS, PROGRESS_STATUS_LABELS } from '../../../lib/constants';

const contractStatusStyles = {
  PENDING: 'bg-amber/10 text-amber',
  ACTIVE: 'bg-success/10 text-success',
  COMPLETE: 'bg-primary/10 text-primary',
  CANCEL: 'bg-error/10 text-error',
  WITHDRAWN: 'bg-faint/10 text-faint',
};

const progressStatusStyles = {
  NOT_STARTED: 'bg-faint/10 text-faint',
  IN_PROGRESS: 'bg-teal/10 text-teal',
  COMPLETED: 'bg-success/10 text-success',
};

function ContractCard({ contract }) {
  return (
    <Link
      to={`/contracts/${contract.contractId}`}
      className="block bg-surface border border-border rounded-xl p-4 hover:border-primary/30 transition"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-body font-semibold text-sm text-ink line-clamp-1">
          {contract.jobTitle}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs font-body font-medium px-2 py-0.5 rounded-full ${
              contractStatusStyles[contract.status] || 'bg-faint/10 text-faint'
            }`}
          >
            {CONTRACT_STATUS_LABELS[contract.status] || contract.status}
          </span>
        </div>
      </div>

      <p className="text-xs font-body text-muted mb-2">
        {contract.gigName ? `With ${contract.gigName}` : contract.client ? `With ${contract.client}` : ''}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-body text-faint">
          <span className="font-mono text-ink font-semibold">₹{contract.agreementAmount}</span>
          {contract.deadline && (
            <span>Due {new Date(contract.deadline).toLocaleDateString()}</span>
          )}
        </div>
        <span
          className={`text-xs font-body font-medium px-2 py-0.5 rounded-full ${
            progressStatusStyles[contract.progressStatus] || 'bg-faint/10 text-faint'
          }`}
        >
          {PROGRESS_STATUS_LABELS[contract.progressStatus] || contract.progressStatus}
        </span>
      </div>
    </Link>
  );
}

export default ContractCard;