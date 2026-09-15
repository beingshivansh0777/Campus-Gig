import { useQuery } from '@tanstack/react-query';
import { gigProfileApi } from '../api';

export const useGigProfileById = (gigId) => {
  console.log('HOOK CALLED — gigId:', gigId, 'enabled:', !!gigId);

  return useQuery({
    queryKey: ['gigProfile', gigId],
    queryFn: () => {
      console.log('queryFn called with gigId:', gigId);
      return gigProfileApi.getGigProfileById(gigId).then((res) => res.data);
    },
    enabled: !!gigId,
  });
};