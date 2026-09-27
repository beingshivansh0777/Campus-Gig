import axiosInstance from "../../api/axiosInstance";

export const notificationsApi = {
  list: (params) => axiosInstance.get("/notifications", { params }),

  unreadCount: () => axiosInstance.get("/notifications/unread-count"),
  markAsRead: (id) => axiosInstance.patch(`/notifications/${id}/read`),
  markAllAsRead: () => axiosInstance.patch("/notifications/mark-all-read"),
};
