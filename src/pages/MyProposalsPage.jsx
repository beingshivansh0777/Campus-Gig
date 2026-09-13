import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyProposals } from '../features/proposals/hooks/useMyProposals';
import { useWithdrawProposal } from '../features/proposals/hooks/useWithdrawProposal';
import EditProposalModal from '../features/proposals/componets/EditProposalModal';
import { PROPOSAL_STATUS_TABS, APPLICATION_STATUS_LABELS } from '../lib/constants';

const statusStyles = {
  APPLIED: 'bg-primary/10 text-primary',
  SHORTLISTED: 'bg-amber/10 text-amber',
  ACCEPTED: 'bg-success/10 text-success',
  REJECTED: 'bg-error/10 text-error',
  WITHDRAWN: 'bg-faint/10 text-faint',
};

function MyProposalsPage() {
  const [statusTab, setStatusTab] = useState('APPLIED');
  const [editingProposal, setEditingProposal] = useState(null);
  const { data: proposals, isLoading } = useMyProposals(statusTab);
  const withdrawProposal = useWithdrawProposal();

  const handleWithdraw = (proposalId) => {
    if (confirm('Withdraw this proposal? This cannot be undone.')) {
      withdrawProposal.mutate(proposalId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">My Proposals</h1>
        <Link
          to="/jobs"
          className="text-sm font-body font-semibold text-primary hover:underline"
        >
          Find more work
        </Link>
      </div>

      <div className="flex items-center gap-1 border-b border-border mb-6 overflow-x-auto">
        {PROPOSAL_STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusTab(tab)}
            className={`px-3 py-2.5 text-sm font-body font-medium border-b-2 whitespace-nowrap transition ${
              statusTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {APPLICATION_STATUS_LABELS[tab]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-border/30 rounded-xl" />
          ))}
        </div>
      ) : !proposals || proposals.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted mb-3">
            No {APPLICATION_STATUS_LABELS[statusTab]?.toLowerCase()} proposals.
          </p>
          <Link to="/jobs" className="text-sm font-body font-semibold text-primary hover:underline">
            Browse open projects
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {proposals.map((proposal, i) => (
            <div key={proposal.id ?? i} className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-body text-ink line-clamp-2">{proposal.coverLetter}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs font-body text-faint">
                    <span className="font-mono text-ink font-semibold">₹{proposal.budget}</span>
                    <span>·</span>
                    <span>
                      Delivery by {new Date(proposal.deliveryDate).toLocaleDateString()}
                    </span>
                    <span>·</span>
                    <span>Applied {new Date(proposal.applyAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-body font-medium px-2.5 py-1 rounded-full shrink-0 ${
                    statusStyles[proposal.jobApplicationStatus] || 'bg-faint/10 text-faint'
                  }`}
                >
                  {APPLICATION_STATUS_LABELS[proposal.jobApplicationStatus] ||
                    proposal.jobApplicationStatus}
                </span>
              </div>

              {statusTab === 'APPLIED' && (
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                  <button
                    onClick={() => setEditingProposal(proposal)}
                    disabled={!proposal.id}
                    className="text-xs font-body font-semibold text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleWithdraw(proposal.id)}
                    disabled={withdrawProposal.isPending || !proposal.id}
                    className="text-xs font-body font-semibold text-error hover:underline disabled:opacity-50 disabled:no-underline"
                  >
                    Withdraw
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editingProposal && (
        <EditProposalModal proposal={editingProposal} onClose={() => setEditingProposal(null)} />
      )}
    </div>
  );
}

export default MyProposalsPage;