import axiosInstance from '../../api/axiosInstance';

export const notificationsApi = {
  list: (params) => axiosInstance.get('/notifications', { params }),
  unreadCount: () => axiosInstance.get('/notifications/unread-count'),
  markAllAsRead: () => axiosInstance.patch('/notifications/mark-all-read'),
};