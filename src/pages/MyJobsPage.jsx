import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyJobs } from '../features/jobs/hooks/useMyJobs';
import JobCard from '../features/jobs/components/JobCard';

const TABS = [
  { key: 'OPEN', label: 'Open' },
  { key: 'CLOSED', label: 'Closed' },
];

function MyJobsPage() {
  const [status, setStatus] = useState('OPEN');
  const { data: jobs, isLoading } = useMyJobs(status);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-[#211A2E]">My Projects</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/jobs/drafts"
            className="text-sm font-body font-semibold text-[#8B87A0] hover:text-[#211A2E] transition-colors"
          >
            Drafts
          </Link>
          <Link
            to="/jobs/create"
            className="bg-[#7C3AED] text-white font-body font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#6D28D9] transition-colors"
          >
            + Post a Project
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-[#EDE9F5] mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatus(tab.key)}
            className={`px-4 py-2.5 text-sm font-body font-medium border-b-2 transition-colors ${
              status === tab.key
                ? 'border-[#7C3AED] text-[#7C3AED]'
                : 'border-transparent text-[#8B87A0] hover:text-[#211A2E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-[#EDE9F5]/60 rounded-xl" />
          ))}
        </div>
      ) : !jobs || jobs.length === 0 ? (
        <div className="bg-white border border-[#EDE9F5] rounded-xl p-10 text-center">
          <p className="font-body text-sm text-[#8B87A0] mb-3">
            No {status.toLowerCase()} projects yet.
          </p>
          <Link
            to="/jobs/create"
            className="text-sm font-body font-semibold text-[#7C3AED] hover:underline"
          >
            Post your first project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} linkTo={`/jobs/manage/${job.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyJobsPage;
