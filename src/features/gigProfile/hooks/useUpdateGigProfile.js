import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gigProfileApi } from '../api';
import toast from 'react-hot-toast';

export const useUpdateGigProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gigProfileApi.updateGigProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigProfile'] });
      toast.success('Gig profile updated');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Could not update Gig profile');
    },
  });
};