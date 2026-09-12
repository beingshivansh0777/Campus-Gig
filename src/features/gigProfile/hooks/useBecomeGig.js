import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { gigProfileApi } from '../api';
import { useAuthStore } from '../../auth/authStore';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useBecomeGig = () => {
  const navigate = useNavigate();
  const setIsGig = useAuthStore((state) => state.setIsGig);

  return useMutation({
    mutationFn: gigProfileApi.becomeGig,
    onSuccess: () => {
      setIsGig(true);
      toast.success('Your Gig profile is live! You can now browse and apply to jobs.');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};