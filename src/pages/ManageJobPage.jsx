import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useJob } from '../features/jobs/hooks/useJob';
import { useDeleteJob } from '../features/jobs/hooks/useDeleteJob';
import { useApplicants } from '../features/jobs/hooks/useApplicants';
import { useAcceptProposal, useRejectProposal } from '../features/jobs/hooks/useProposalActions';
import { APPLICATION_STATUS_LABELS } from '../lib/constants';

const STATUS_TABS = ['APPLIED', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'];

function ManageJobPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [statusTab, setStatusTab] = useState('APPLIED');

  const { data: job, isLoading: jobLoading } = useJob(jobId);
  const deleteJob = useDeleteJob();
  const { data: applicants, isLoading: applicantsLoading } = useApplicants(jobId, statusTab);
  const acceptProposal = useAcceptProposal(jobId);
  const rejectProposal = useRejectProposal(jobId);

  const handleDelete = () => {
    if (confirm('Delete this project? This cannot be undone.')) {
      deleteJob.mutate(jobId, { onSuccess: () => navigate('/jobs/my-jobs') });
    }
  };

  if (jobLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse h-96 bg-border/30 rounded-xl" />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{job.title}</h1>
          <p className="text-sm font-body text-muted mt-1">
            {job.category?.replace(/_/g, ' ')} · Posted{' '}
            {new Date(job.publishAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/jobs/edit/${jobId}`}
            className="flex items-center gap-1.5 text-sm font-body font-medium text-ink border border-border px-3 py-2 rounded-lg hover:border-ink/30 transition"
          >
            <Pencil size={14} /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-sm font-body font-medium text-error border border-error/20 px-3 py-2 rounded-lg hover:bg-error/5 transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 mb-8">
        <p className="font-body text-sm text-ink whitespace-pre-line">{job.description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm font-body text-muted border-t border-border pt-4">
          <span>Budget: ₹{job.budget}</span>
          <span>·</span>
          <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
          <span>·</span>
          <span>{job.experience}</span>
        </div>
      </div>

      <h2 className="font-display text-lg font-bold text-ink mb-4">Proposals</h2>

      <div className="flex items-center gap-1 border-b border-border mb-4">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusTab(tab)}
            className={`px-3 py-2 text-sm font-body font-medium border-b-2 transition ${
              statusTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {APPLICATION_STATUS_LABELS[tab]}
          </button>
        ))}
      </div>

      {applicantsLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-border/30 rounded-xl" />
          ))}
        </div>
      ) : !applicants || applicants.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <p className="font-body text-sm text-muted">No proposals in this status yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applicants.map((applicant, i) => (
            <div key={applicant.id ?? i} className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-body font-semibold text-sm text-ink">
                    {applicant.gigResponseDTO?.gigFirstName} {applicant.gigResponseDTO?.gigLastName}
                  </p>
                  <p className="text-xs font-body text-muted mt-0.5">
                    {applicant.gigResponseDTO?.title} · {applicant.gigResponseDTO?.college}
                  </p>
                  <p className="text-sm font-body text-ink mt-2 line-clamp-3">
                    {applicant.coverLetter}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs font-body text-muted">
                    <span>Bid: ₹{applicant.bidAmount}</span>
                    <span>·</span>
                    <span>Delivery: {new Date(applicant.deliveryDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {statusTab === 'APPLIED' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => acceptProposal.mutate(applicant.id)}
                      disabled={acceptProposal.isPending || !applicant.id}
                      className="bg-primary text-white text-xs font-body font-semibold px-3 py-1.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
                    >
                      Hire
                    </button>
                    <button
                      onClick={() => rejectProposal.mutate(applicant.id)}
                      disabled={rejectProposal.isPending || !applicant.id}
                      className="text-xs font-body font-semibold text-muted border border-border px-3 py-1.5 rounded-lg hover:border-ink/30 disabled:opacity-50 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageJobPage;