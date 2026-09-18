import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '../api';

export const useMyReview = (contractId, enabled = true) => {
  return useQuery({
    queryKey: ['review', contractId, 'mine'],
    queryFn: () =>
      reviewsApi.getMine(contractId).then((res) => res.data || null), // 204 → res.data is empty
    enabled: !!contractId && enabled,
  });
};