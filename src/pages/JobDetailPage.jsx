import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useJob } from "../features/jobs/hooks/useJob";
import SaveJobButton from "../features/jobs/components/SaveJobButton";
import ApplyModal from "../features/jobs/components/ApplyModal";
import { useAuthStore } from "../features/auth/authStore";

function JobDetailPage() {
  const { jobId } = useParams();
  const { data: job, isLoading, isError } = useJob(jobId);
  const isGig = useAuthStore((state) => state.isGig);
  const [showApplyModal, setShowApplyModal] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse h-96 bg-border/30 rounded-xl" />
    );
  }

  if (isError || !job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <p className="font-body text-sm text-muted">
          This project couldn't be found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="font-display text-2xl font-bold text-ink">
          {job.title}
        </h1>
        <SaveJobButton jobId={job.id} />
      </div>
      <p className="text-sm font-body text-muted mb-6">
        Posted by{" "}
        {[job.clientFirstName, job.clientLastName].filter(Boolean).join(" ") ||
          "a client"}{" "}
        · {job.category?.replace(/_/g, " ")} ·{" "}
        {new Date(job.publishAt).toLocaleDateString()}
      </p>

      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <p className="font-body text-sm text-ink whitespace-pre-line leading-relaxed">
          {job.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="font-mono font-bold text-lg text-ink">₹{job.budget}</p>
          <p className="text-xs font-body text-faint mt-0.5">Budget</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="font-body font-bold text-sm text-ink">
            {new Date(job.deadline).toLocaleDateString()}
          </p>
          <p className="text-xs font-body text-faint mt-0.5">Deadline</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="font-body font-bold text-sm text-ink capitalize">
            {job.experience?.toLowerCase()}
          </p>
          <p className="text-xs font-body text-faint mt-0.5">Experience</p>
        </div>
      </div>

      {job.jobStatus !== "OPEN" ? (
        <p className="text-sm font-body text-faint bg-surface border border-border rounded-lg px-4 py-3 inline-block">
          This job is {job.jobStatus?.toLowerCase()} and no longer accepting
          proposals.
        </p>
      ) : isGig ? (
        <button
          onClick={() => setShowApplyModal(true)}
          className="bg-linear-to-r from-[#7C3AED] to-[#EC4899] text-white font-body font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Submit a Proposal
        </button>
      ) : (
        <p className="text-sm font-body text-faint">
          Only Gigs can submit proposals.{" "}
          <Link
            to="/profile"
            className="text-primary font-semibold hover:underline"
          >
            Become a Gig
          </Link>{" "}
          to apply.
        </p>
      )}
      {showApplyModal && (
        <ApplyModal jobId={jobId} onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
}

export default JobDetailPage;
