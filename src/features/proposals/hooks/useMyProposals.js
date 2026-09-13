import { useQuery } from '@tanstack/react-query';
import { proposalsApi } from '../api';

export const useMyProposals = (status) => {
  return useQuery({
    queryKey: ['myProposals', status],
    queryFn: () =>
      proposalsApi
        .myProposals(
          { applicationStatus: status || undefined },
          { pageNumber: 1, pageSize: 20 }
        )
        .then((res) => res.data),
  });
};