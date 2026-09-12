import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api';

export const useApplicants = (jobId, status = 'APPLIED') => {
  return useQuery({
    queryKey: ['jobApplicants', jobId, status],
    queryFn: () =>
      jobsApi.getApplicants(jobId, { keyword: status, page: 1, size: 20 }).then((res) => res.data),
    enabled: !!jobId,
  });
};