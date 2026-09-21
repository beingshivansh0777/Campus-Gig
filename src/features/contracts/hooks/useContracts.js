import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { contractsApi } from '../api';

const PAGE_SIZE = 7;

export const useContracts = (filters = {}, page = 1) => {
  return useQuery({
    queryKey: ['contracts', filters, page],
    queryFn: () =>
      contractsApi
        .list({ page, size: PAGE_SIZE, direction: 'DESC', field: 'createdAt', ...filters })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};

export { PAGE_SIZE };