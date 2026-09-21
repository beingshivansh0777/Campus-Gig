import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../api';
import { useAdminAuthStore } from '../adminAuthStore';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useAdminLogin = () => {
  const navigate = useNavigate();
  const setToken = useAdminAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: adminApi.login,
    onSuccess: (response) => {
      setToken(response.data['Access Token']);
      toast.success('Welcome, Admin');
      navigate('/admin/dashboard');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useAdminRegister = () => {
  return useMutation({
    mutationFn: adminApi.register,
    onSuccess: () => {
      toast.success('Registered — your access is pending approval.');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};