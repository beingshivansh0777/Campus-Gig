import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useUpdateDraft = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => jobsApi.updateDraft(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobDrafts'] });
      toast.success('Draft updated');
      navigate('/jobs/drafts');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};