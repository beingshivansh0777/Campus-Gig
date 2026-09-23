import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api';
import { useAuthStore } from '../../auth/authStore';

export const useProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.getProfile().then((res) => res.data),
  });

  useEffect(() => {
    if (query.data && query.data.profileImage !== user?.profileImage) {
      setUser({ ...user, ...query.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);

  return query;
};