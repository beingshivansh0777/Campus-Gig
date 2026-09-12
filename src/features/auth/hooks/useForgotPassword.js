import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import toast from 'react-hot-toast';

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: (email) => authApi.sendForgotPasswordOtp(email),
    onSuccess: () => {
      toast.success('OTP sent to your email');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Could not send OTP';
      toast.error(message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ email, otp, newPassword }) =>
      authApi.resetPassword(email, otp, newPassword),
    onSuccess: () => {
      toast.success('Password changed successfully. Please log in.');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Invalid OTP';
      toast.error(message);
    },
  });
};