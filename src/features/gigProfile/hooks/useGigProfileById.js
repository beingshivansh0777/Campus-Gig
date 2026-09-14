import { useQuery } from '@tanstack/react-query';
import { gigProfileApi } from '../api';

export const useGigProfileById = (gigId) => {
  return useQuery({
    queryKey: ['gigProfile', gigId],
    queryFn: () => gigProfileApi.getGigProfileById(gigId).then((res) => res.data),
    enabled: !!gigId,
  });
};