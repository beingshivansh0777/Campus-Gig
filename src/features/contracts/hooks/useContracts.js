import { useQuery } from '@tanstack/react-query';
import { contractsApi } from '../api';

export const useContracts = (filters = {}) => {
  return useQuery({
    queryKey: ['contracts', filters],
    queryFn: () =>
      contractsApi
        .list({ page: 1, size: 20, direction: 'DESC', field: 'createdAt', ...filters })
        .then((res) => res.data),
  });
};