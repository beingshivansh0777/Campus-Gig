import { useQuery, useQueries } from '@tanstack/react-query';
import { jobsApi } from '../api';

export const useAllReceivedProposals = () => {
  // Step 1: get every job this client has posted (both Open and Closed, so nothing's missed)
  const openJobsQuery = useQuery({
    queryKey: ['myJobs', 'OPEN'],
    queryFn: () => jobsApi.myJobs({ status: 'OPEN', page: 1, size: 50 }).then((res) => res.data),
  });

  const closedJobsQuery = useQuery({
    queryKey: ['myJobs', 'CLOSED'],
    queryFn: () => jobsApi.myJobs({ status: 'CLOSED', page: 1, size: 50 }).then((res) => res.data),
  });

  const allJobs = [...(openJobsQuery.data || []), ...(closedJobsQuery.data || [])];
  const jobsReady = openJobsQuery.isSuccess && closedJobsQuery.isSuccess;

  // Step 2: for every job, fetch its applicants (all statuses, merged)
  const applicantQueries = useQueries({
    queries: jobsReady
      ? allJobs.map((job) => ({
          queryKey: ['jobApplicants', job.id, 'ALL'],
          queryFn: () =>
            jobsApi
              .getApplicants(job.id, { keyword: 'APPLIED', page: 1, size: 50 })
              .then((res) => res.data.map((a) => ({ ...a, jobTitle: job.title, jobId: job.id }))),
        }))
      : [],
  });

  const isLoading = !jobsReady || applicantQueries.some((q) => q.isLoading);
  const isError = openJobsQuery.isError || closedJobsQuery.isError;

  // Step 3: flatten every job's applicant list into one combined feed
  const allProposals = applicantQueries
    .filter((q) => q.isSuccess)
    .flatMap((q) => q.data)
    .sort((a, b) => new Date(b.applyAt) - new Date(a.applyAt)); // newest first

  return { data: allProposals, isLoading, isError };
};