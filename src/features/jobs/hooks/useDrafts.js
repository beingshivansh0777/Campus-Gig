import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api';

export const useDrafts = () => {
  return useQuery({
    queryKey: ['jobDrafts'],
    queryFn: () => jobsApi.listDrafts().then((res) => res.data),
  });
};