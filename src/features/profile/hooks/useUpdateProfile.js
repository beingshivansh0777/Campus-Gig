import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import { useAuthStore } from '../../auth/authStore';
import toast from 'react-hot-toast';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: profileApi.editProfile,
    onSuccess: (response) => {
      setUser(response.data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Could not update profile');
    },
  });
};