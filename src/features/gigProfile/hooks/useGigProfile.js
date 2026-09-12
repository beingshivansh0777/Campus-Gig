import { useQuery } from '@tanstack/react-query';
import { gigProfileApi } from '../api';
import { useAuthStore } from '../../auth/authStore';

export const useGigProfile = () => {
  const isGig = useAuthStore((state) => state.isGig);

  return useQuery({
    queryKey: ['gigProfile'],
    queryFn: () => gigProfileApi.getMyGigProfile().then((res) => res.data),
    enabled: isGig, // only fetch if the user actually has a Gig profile
  });
};