import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { notificationsApi } from "../api";
import { subscribeToNotifications } from "../../../lib/socket";
import { useAuthStore } from "../../auth/authStore";

export const useNotifications = () => {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();
  const [liveNotifications, setLiveNotifications] = useState([]);
  const seenIds = useRef(new Set());
  /*
   * Fetch notifications
   */
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],

    queryFn: () =>
      notificationsApi.list({ page: 1, size: 20 }).then((res) => res.data),

    enabled: !!token,
  });

  /*
   * Fetch unread notification count
   */
  const { data: unreadData } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notificationsApi.unreadCount().then((res) => res.data),
    enabled: !!token,
  });

  /*
   * Mark ONE notification as read
   */
  const markAsReadMutation = useMutation({
    mutationFn: (id) => notificationsApi.markAsRead(id),
    /*
     * Optimistic update
     * UI changes immediately:
     * 🔵 dot disappears
     * blue background disappears
     */
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["notifications"],
      });

      const previousNotifications = queryClient.getQueryData(["notifications"]);
      const previousLiveNotifications = liveNotifications;

      /*
       * Update React Query cache
       */
      queryClient.setQueryData(["notifications"], (old) => {
        if (!old?.content) {
          return old;
        }

        return {
          ...old,
          content: old.content.map((notification) =>
            notification.id === id
              ? {
                  ...notification,
                  isRead: true,
                }
              : notification,
          ),
        };
      });

      /*
       * Update live notifications
       */
      setLiveNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );

      return {
        previousNotifications,
        previousLiveNotifications,
      };
    },

    /*
     * If API request fails,
     * restore previous state.
     */
    onError: (_error, _id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications"],
          context.previousNotifications,
        );
      }
      if (context?.previousLiveNotifications) {
        setLiveNotifications(context.previousLiveNotifications);
      }
    },

    /*
     * Refresh unread count after backend confirms.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
    },
  });

  /*
   * Mark ALL notifications as read
   */
  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),

    onSuccess: () => {
      /*
       * Update UI immediately
       */
      setLiveNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      /*
       * Update React Query cache
       */
      queryClient.setQueryData(["notifications"], (old) => {
        if (!old?.content) {
          return old;
        }

        return {
          ...old,

          content: old.content.map((notification) => ({
            ...notification,
            isRead: true,
          })),
        };
      });

      /*
       * Refresh unread count
       */
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
    },
  });

  /*
   * Sync API notifications with local state
   */
  useEffect(() => {
    if (!data?.content) {
      return;
    }

    setLiveNotifications(data.content);

    seenIds.current = new Set(
      data.content.map((notification) => notification.id),
    );
  }, [data]);

  /*
   * Real-time notification subscription
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    const unsubscribe = subscribeToNotifications((newNotification) => {
      /*
       * Prevent duplicate notification
       */
      if (seenIds.current.has(newNotification.id)) {
        return;
      }

      seenIds.current.add(newNotification.id);

      /*
       * Add new notification at the top
       */
      setLiveNotifications((prev) => [newNotification, ...prev]);

      /*
       * Refresh unread count
       */
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
    });

    return unsubscribe;
  }, [token, queryClient]);

  const baseUnreadCount = unreadData?.count ?? 0;

  return {
    notifications: liveNotifications,

    unreadCount: baseUnreadCount,

    isLoading,

    /*
     * Mark single notification as read
     */
    markAsRead: (id) => markAsReadMutation.mutate(id),

    /*
     * Mark all notifications as read
     */
    markAllAsRead: () => markAllAsReadMutation.mutate(),
  };
};
