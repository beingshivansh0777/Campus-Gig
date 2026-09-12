import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api';

export const useMyJobs = (status = 'OPEN') => {
  return useQuery({
    queryKey: ['myJobs', status],
    queryFn: () => jobsApi.myJobs({ status, page: 1, size: 20 }).then((res) => res.data),
  });
};