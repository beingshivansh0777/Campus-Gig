import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useDeleteDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (draftId) => jobsApi.deleteDraft(draftId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobDrafts'] });
      toast.success('Draft deleted');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};