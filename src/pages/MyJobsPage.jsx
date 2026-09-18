import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMyJobs } from '../features/jobs/hooks/useMyJobs';
import JobCard from '../features/jobs/components/JobCard';

const TABS = [
  { key: 'OPEN', label: 'Open' },
  { key: 'CLOSED', label: 'Closed' },
];

function MyJobsPage() {
  const [status, setStatus] = useState('OPEN');
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useMyJobs(status, page);

  useEffect(() => {
    setPage(1);
  }, [status]);

  const jobs = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const goToPage = (p) => setPage(Math.min(Math.max(p, 1), totalPages));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-ink">My Projects</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/jobs/drafts"
            className="text-sm font-body font-semibold text-faint hover:text-ink transition-colors"
          >
            Drafts
          </Link>
          <Link
            to="/jobs/create"
            className="bg-primary text-white font-body font-semibold text-sm px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            + Post a Project
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatus(tab.key)}
            className={`px-4 py-2.5 text-sm font-body font-medium border-b-2 transition-colors ${
              status === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-faint hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-border/60 rounded-xl" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-faint mb-3">
            No {status.toLowerCase()} projects yet.
          </p>
          <Link
            to="/jobs/create"
            className="text-sm font-body font-semibold text-primary hover:underline"
          >
            Post your first project
          </Link>
        </div>
      ) : (
        <>
          <div className={`space-y-3 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} linkTo={`/jobs/manage/${job.id}`} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm font-body font-medium text-faint border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:text-ink hover:border-primary/40 transition-colors"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-8 h-8 text-sm font-body font-medium rounded-lg transition-colors ${
                    p === page
                      ? 'bg-primary text-white'
                      : 'text-faint hover:text-ink hover:bg-border/60'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm font-body font-medium text-faint border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:text-ink hover:border-primary/40 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyJobsPage;