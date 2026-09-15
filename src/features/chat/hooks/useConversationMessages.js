import { useQuery } from '@tanstack/react-query';
import { chatApi } from '../api';

export const useConversationMessages = (conversationId) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => chatApi.getMessages(conversationId).then((res) => res.data),
    enabled: !!conversationId,
  });
};