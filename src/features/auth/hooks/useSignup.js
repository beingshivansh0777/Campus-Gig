import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import toast from 'react-hot-toast';

export const useSignup = () => {
  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      toast.success('Account created! Check your email for the verification code.');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(message);
    },
  });
};