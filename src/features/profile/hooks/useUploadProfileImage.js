import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import toast from 'react-hot-toast';

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return profileApi.uploadImage(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile picture updated');
    },
    onError: () => toast.error('Failed to upload image'),
  });
};