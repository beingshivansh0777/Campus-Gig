import { useMutation, useQueryClient } from '@tanstack/react-query';
import { proposalsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useWithdrawProposal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobApplicationId) => proposalsApi.withdraw(jobApplicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProposals'] });
      toast.success('Proposal withdrawn');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};