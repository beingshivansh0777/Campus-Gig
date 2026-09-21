import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';

// Reports
export const useAdminReports = (params) => useQuery({
  queryKey: ['adminReports', params],
  queryFn: () => adminApi.reports(params).then((res) => res.data),
});
export const useAdminReport = (id) => useQuery({
  queryKey: ['adminReport', id],
  queryFn: () => adminApi.report(id).then((res) => res.data),
  enabled: !!id,
});

// Jobs
export const useAdminJobs = (params) => useQuery({
  queryKey: ['adminJobs', params],
  queryFn: () => adminApi.jobs(params).then((res) => res.data),
});
export const useAdminJob = (id) => useQuery({
  queryKey: ['adminJob', id],
  queryFn: () => adminApi.job(id).then((res) => res.data),
  enabled: !!id,
});

// Job Applications
export const useAdminJobApplications = (params) => useQuery({
  queryKey: ['adminJobApplications', params],
  queryFn: () => adminApi.jobApplications(params).then((res) => res.data),
});
export const useAdminJobApplication = (id) => useQuery({
  queryKey: ['adminJobApplication', id],
  queryFn: () => adminApi.jobApplication(id).then((res) => res.data),
  enabled: !!id,
});

// Gigs
export const useAdminGigs = (params) => useQuery({
  queryKey: ['adminGigs', params],
  queryFn: () => adminApi.gigs(params).then((res) => res.data),
});
export const useAdminGig = (id) => useQuery({
  queryKey: ['adminGig', id],
  queryFn: () => adminApi.gig(id).then((res) => res.data),
  enabled: !!id,
});

// Clients
export const useAdminClients = (params) => useQuery({
  queryKey: ['adminClients', params],
  queryFn: () => adminApi.clients(params).then((res) => res.data),
});
export const useAdminClient = (id) => useQuery({
  queryKey: ['adminClient', id],
  queryFn: () => adminApi.client(id).then((res) => res.data),
  enabled: !!id,
});