import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from '../api';
import { getErrorMessage } from '../../../lib/errorMessages';
import toast from 'react-hot-toast';

export const useAcceptProposal = (jobId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applicationId) => jobsApi.acceptProposal(jobId, applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplicants', jobId] });
      queryClient.invalidateQueries({ queryKey: ['myJobs'] });
      toast.success('Proposal accepted — contract created');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useRejectProposal = (jobId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applicationId) => jobsApi.rejectProposal(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplicants', jobId] });
      toast.success('Proposal rejected');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useShortlistProposal = (jobId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applicationId) => jobsApi.shortlistProposal(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplicants', jobId] });
      toast.success('Proposal shortlisted');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};