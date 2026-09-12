import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId) => jobsApi.delete(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myJobs'] });
      toast.success('Job deleted');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};