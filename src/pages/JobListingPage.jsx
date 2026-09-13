import { useState } from 'react';
import { useJobSearch } from '../features/jobs/hooks/useJobSearch';
import JobCard from '../features/jobs/components/JobCard';
import JobFilters from '../features/jobs/components/JobFilters';

function JobListingPage() {
  const [filters, setFilters] = useState({ sortField: 'budget', sortDirection: 'DESC' });
  const { data: jobs, isLoading, isError } = useJobSearch(filters);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Find Work</h1>
      <p className="font-body text-sm text-muted mb-6">
        Browse open projects posted by students across campus.
      </p>

      <JobFilters filters={filters} onChange={setFilters} />

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse h-40 bg-border/30 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted">Couldn't load projects. Try again.</p>
        </div>
      ) : !jobs || jobs.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted">No open projects match your filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} linkTo={`/jobs/${job.id}`} showBookmark />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobListingPage;