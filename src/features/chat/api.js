import axiosInstance from '../../api/axiosInstance';

export const chatApi = {
  getMessages: (conversationId) =>
    axiosInstance.get(`/conversations/${conversationId}/messages`),
};