import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { useAuthStore } from '../authStore';
import toast from 'react-hot-toast';

export const useSendOtp = () => {
  return useMutation({
    mutationFn: authApi.sendVerificationOtp,
    onSuccess: () => toast.success('Verification code sent to your email'),
    onError: () => toast.error('Could not send verification code'),
  });
};

export const useVerifyEmail = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      // Optimistically mark the locally-stored user as verified
      if (user) setUser({ ...user, isVerified: true });
      toast.success('Email verified!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    },
  });
};