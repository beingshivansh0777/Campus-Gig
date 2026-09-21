import { Link } from "react-router-dom";
import { useAuthStore } from "../features/auth/authStore";
import { useClientDashboard } from "../features/dashboard/hooks/useClientDashboard";
import { useGigDashboard } from "../features/dashboard/hooks/useGigDashboard";
import StatCard from "../features/dashboard/components/StatCard";
import JobCard from "../features/jobs/components/JobCard";
import {
  CONTRACT_STATUS_LABELS,
  PROGRESS_STATUS_LABELS,
} from "../lib/constants";

function ContractRow({ contract }) {
  return (
    <Link
      to={`/contracts/${contract.contractId}`}
      className="block bg-surface border border-border rounded-xl p-4 hover:border-primary/30 transition"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-body font-semibold text-sm text-ink line-clamp-1">
          {contract.jobTitle}
        </p>
        <span className="text-xs font-body font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
          {CONTRACT_STATUS_LABELS[contract.status] || contract.status}
        </span>
      </div>
      <p className="text-xs font-body text-faint mt-1">
        ₹{contract.agreementAmount} ·{" "}
        {PROGRESS_STATUS_LABELS[contract.progressStatus]}
      </p>
    </Link>
  );
}

function ClientDashboard() {
  const { isLoading, stats, recentJobs, recentContracts } =
    useClientDashboard();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>

        <Link
          to="/jobs/create"
          className="bg-primary text-white font-body font-semibold text-sm px-4 py-2 rounded-lg hover:bg-primary-hover transition"
        >
          + Post a Project
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse h-24 bg-border/30 rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Projects" value={stats.activeJobsCount} />

          <StatCard
            label="Active Contracts"
            value={stats.activeContractsCount}
            accent="teal"
          />

          <StatCard
            label="Completed Contracts"
            value={stats.completedContractsCount}
            accent="success"
          />

          <StatCard
            label="Total Spent"
            value={`₹${stats.totalSpent}`}
            accent="amber"
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-body font-semibold text-sm text-ink">
              Recent Jobs
            </h2>

            <Link
              to="/jobs/my-jobs"
              className="text-xs font-body font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          {recentJobs.length === 0 ? (
            <p className="text-sm font-body text-faint">No jobs posted yet.</p>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  linkTo={`/jobs/manage/${job.id}`}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-body font-semibold text-sm text-ink">
              Recent Contracts
            </h2>

            <Link
              to="/contracts"
              className="text-xs font-body font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          {recentContracts.length === 0 ? (
            <p className="text-sm font-body text-faint">No contracts yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContracts.map((c) => (
                <ContractRow key={c.contractId} contract={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function GigDashboard() {
  const { isLoading, stats, recentContracts } = useGigDashboard();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse h-24 bg-border/30 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
        <Link
          to="/jobs"
          className="bg-linear-to-r from-primary to-accent-pink text-white font-body font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Find Work
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Active Contracts"
          value={stats.activeContractsCount}
          accent="teal"
        />

        <StatCard
          label="Completed Contracts"
          value={stats.completedContractsCount}
          accent="success"
        />

        <StatCard
          label="Total Earnings"
          value={`₹${stats.totalEarnings}`}
          accent="amber"
        />

        <StatCard
          label={`Rating${stats.totalRatings ? ` (${stats.totalRatings})` : ""}`}
          value={stats.averageRating ? stats.averageRating.toFixed(1) : "—"}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-body font-semibold text-sm text-ink">
              Recent Contracts
            </h2>
            <Link
              to="/contracts"
              className="text-xs font-body font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          {recentContracts.length === 0 ? (
            <p className="text-sm font-body text-faint">No contracts yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContracts.map((c) => (
                <ContractRow key={c.contractId} contract={c} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-body font-semibold text-sm text-ink mb-3">
            My Proposals
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/proposals"
              className="bg-surface border border-border rounded-xl p-4 text-center hover:border-primary/30 transition"
            >
              <p className="font-display text-xl font-bold text-ink">
                {stats.appliedCount}
              </p>
              <p className="text-xs font-body text-muted mt-1">Applied</p>
            </Link>
            <Link
              to="/proposals"
              className="bg-surface border border-border rounded-xl p-4 text-center hover:border-primary/30 transition"
            >
              <p className="font-display text-xl font-bold text-ink">
                {stats.shortlistedCount}
              </p>
              <p className="text-xs font-body text-muted mt-1">Shortlisted</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardPage() {
  const isGig = useAuthStore((state) => state.isGig);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {isGig ? <GigDashboard /> : <ClientDashboard />}
    </div>
  );
}

export default DashboardPage;
