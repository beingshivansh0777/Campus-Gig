import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '../api';

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      reviewsApi.list({ pageNumber: 1, size: 20, direction: 'DESC', byFiled: 'createdAt' }).then((res) => res.data),
  });
};