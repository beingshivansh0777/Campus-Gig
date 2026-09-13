import { useQuery } from '@tanstack/react-query';
import { bookmarksApi } from '../api';

export const useBookmarks = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => bookmarksApi.list({ page: 1, size: 50 }).then((res) => res.data),
  });
};