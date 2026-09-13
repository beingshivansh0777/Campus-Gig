import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarksApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  const save = useMutation({
    mutationFn: (jobId) => bookmarksApi.save(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success('Job saved');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const remove = useMutation({
    mutationFn: (jobId) => bookmarksApi.remove(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success('Removed from saved');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return { save, remove };
};