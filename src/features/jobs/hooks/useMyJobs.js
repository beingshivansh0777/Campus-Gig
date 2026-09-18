import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { jobsApi } from '../api';

const PAGE_SIZE = 5;

export const useMyJobs = (status = 'OPEN', page = 1) => {
  return useQuery({
    queryKey: ['myJobs', status, page],
    queryFn: () =>
      jobsApi
        .myJobs({ status, page, size: PAGE_SIZE, direction: 'DESC', field: 'publishAt' })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};

export { PAGE_SIZE };