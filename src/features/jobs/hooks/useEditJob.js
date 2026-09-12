import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useEditJob = (jobId) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => jobsApi.edit(jobId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myJobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      toast.success('Job updated');
      navigate('/jobs/my-jobs');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};