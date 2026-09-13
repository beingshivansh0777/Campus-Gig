import { useMutation } from '@tanstack/react-query';
import { proposalsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useApplyToJob = () => {
  return useMutation({
    mutationFn: proposalsApi.apply,
    onSuccess: () => {
      toast.success('Proposal submitted! Track its status from My Proposals.');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};