import { useMutation } from '@tanstack/react-query';
import { reportsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useCreateReport = () => {
  return useMutation({
    mutationFn: (payload) => reportsApi.create(payload),
    onSuccess: () => {
      toast.success('Report submitted. Our team will review it shortly.');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};