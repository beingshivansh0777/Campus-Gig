import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useCreateReview = (contractId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => reviewsApi.create(contractId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['contract', String(contractId)] });
      queryClient.invalidateQueries({ queryKey: ['review', contractId, 'mine'] });
      toast.success('Review submitted');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useUpdateReview = (contractId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => reviewsApi.update(contractId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review', contractId, 'mine'] });
      toast.success('Review updated');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useDeleteReview = (contractId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => reviewsApi.delete(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review', contractId, 'mine'] });
      toast.success('Review deleted');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};