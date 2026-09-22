import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { notificationsApi } from '../api';
import { subscribeToNotifications } from '../../../lib/socket';
import { useAuthStore } from '../../auth/authStore';

export const useNotifications = () => {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();
  const [liveNotifications, setLiveNotifications] = useState([]);
  const seenIds = useRef(new Set());

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.list({ page: 1, size: 20 }).then((res) => res.data),
    enabled: !!token,
  });

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => notificationsApi.unreadCount().then((res) => res.data),
    enabled: !!token,
  });

  const markAllAsRead = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  useEffect(() => {
    if (!data?.content) return;
    setLiveNotifications(data.content);
    seenIds.current = new Set(data.content.map((n) => n.id));
  }, [data]);

  useEffect(() => {
    if (!token) return;
    const unsubscribe = subscribeToNotifications((newNotification) => {
      if (seenIds.current.has(newNotification.id)) return;
      seenIds.current.add(newNotification.id);
      setLiveNotifications((prev) => [newNotification, ...prev]);
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    });
    return unsubscribe;
  }, [token, queryClient]);

  const baseUnreadCount = unreadData?.count ?? 0;
  const liveUnseenCount = liveNotifications.filter(
    (n) => !n.isRead && !(data?.content || []).some((d) => d.id === n.id)
  ).length;

  return {
    notifications: liveNotifications,
    unreadCount: baseUnreadCount,
    isLoading,
    markAllAsRead: () => markAllAsRead.mutate(),
  };
};