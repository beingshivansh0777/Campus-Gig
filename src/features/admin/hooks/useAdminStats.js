import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';

// Default to a wide window (last 2 years) so stats aren't accidentally
// scoped to "today only" by the backend's default date range
const DEFAULT_RANGE = {
  from: '2020-01-01',
  to: new Date().toISOString().split('T')[0],
};

export const useAdminStats = (dateRange) => {
  const range = { ...DEFAULT_RANGE, ...dateRange };
  return useQuery({
    queryKey: ['adminStats', range],
    queryFn: () => adminApi.stats(range).then((res) => res.data),
  });
};

export const useAdminGrowthChart = (dateRange) => {
  const range = { ...DEFAULT_RANGE, ...dateRange };
  return useQuery({
    queryKey: ['adminGrowthChart', range],
    queryFn: () => adminApi.growthChart(range).then((res) => res.data),
  });
};

export const useAdminPopularJobs = (dateRange) => {
  const range = { ...DEFAULT_RANGE, ...dateRange };
  return useQuery({
    queryKey: ['adminPopularJobs', range],
    queryFn: () => adminApi.popularJobs(range).then((res) => res.data),
  });
};