import { useMutation, useQueryClient } from '@tanstack/react-query';
import { proposalsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useUpdateProposal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobApplicationId, payload }) => proposalsApi.update(jobApplicationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProposals'] });
      toast.success('Proposal updated');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};