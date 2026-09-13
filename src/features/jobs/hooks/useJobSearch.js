import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api';

export const useJobSearch = (filters) => {
  return useQuery({
    queryKey: ['jobSearch', filters],
    queryFn: () =>
      jobsApi
        .list({
          pageNumber: 1,
          pageSize: 20,
          byField: filters.sortField || 'budget',
          direction: filters.sortDirection || 'DESC',
          min: filters.min || undefined,
          max: filters.max || undefined,
        })
        .then((res) => res.data),
    placeholderData: (prev) => prev, // keeps old results visible while a new filter loads
  });
};