import { useQuery } from '@tanstack/react-query';
import { contractsApi } from '../api';

export const useContract = (contractId) => {
  return useQuery({
    queryKey: ['contract', contractId],
    queryFn: () => contractsApi.getById(contractId).then((res) => res.data),
    enabled: !!contractId,
  });
};