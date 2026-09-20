import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../api';

export const useMyReports = () => {
  return useQuery({
    queryKey: ['myReports'],
    queryFn: () => reportsApi.myReports({ page: 1, size: 20 }).then((res) => res.data),
  });
};