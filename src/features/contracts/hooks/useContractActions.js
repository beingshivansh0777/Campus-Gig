import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contractsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useUpdateProgress = (contractId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (progress) => contractsApi.updateProgress(contractId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Progress updated');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useActivateContract = (contractId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => contractsApi.activate(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contract activated');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useCompleteContract = (contractId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => contractsApi.complete(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contract marked complete');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useBreakContract = (contractId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => contractsApi.breakContract(contractId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contract updated');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};