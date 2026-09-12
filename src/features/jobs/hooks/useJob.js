import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api';

export const useJob = (jobId) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobsApi.getById(jobId).then((res) => res.data),
    enabled: !!jobId,
  });
};