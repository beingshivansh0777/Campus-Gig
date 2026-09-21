import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';

export const useAdminStats = (dateRange = {}) => {
  return useQuery({
    queryKey: ['adminStats', dateRange],
    queryFn: () => adminApi.stats(dateRange).then((res) => res.data),
  });
};

export const useAdminGrowthChart = (dateRange = {}) => {
  return useQuery({
    queryKey: ['adminGrowthChart', dateRange],
    queryFn: () => adminApi.growthChart(dateRange).then((res) => res.data),
  });
};

export const useAdminPopularJobs = (dateRange = {}) => {
  return useQuery({
    queryKey: ['adminPopularJobs', dateRange],
    queryFn: () => adminApi.popularJobs(dateRange).then((res) => res.data),
  });
};