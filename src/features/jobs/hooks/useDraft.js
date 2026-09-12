import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api';

export const useDraft = (draftId) => {
  return useQuery({
    queryKey: ['jobDraft', draftId],
    queryFn: () => jobsApi.getDraft(draftId).then((res) => res.data),
    enabled: !!draftId,
  });
};