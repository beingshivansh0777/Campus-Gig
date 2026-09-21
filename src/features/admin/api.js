import adminAxiosInstance from '../../api/adminAxiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const adminApi = {
  register: (payload) => adminAxiosInstance.post(ENDPOINTS.admin.register, payload),
  login: (payload) => adminAxiosInstance.post(ENDPOINTS.admin.login, payload),
  sendMail: (payload) => adminAxiosInstance.post(ENDPOINTS.admin.mail, payload),

  stats: (params) => adminAxiosInstance.get(ENDPOINTS.admin.stats, { params }),
  growthChart: (params) => adminAxiosInstance.get(ENDPOINTS.admin.growthChart, { params }),
  popularJobs: (params) => adminAxiosInstance.get(ENDPOINTS.admin.popularJob, { params }),

  reports: (params) => adminAxiosInstance.get(ENDPOINTS.admin.reports, { params }),
  report: (id) => adminAxiosInstance.get(ENDPOINTS.admin.report, { params: { id } }),

  jobs: (params) => adminAxiosInstance.get(ENDPOINTS.admin.jobs, { params }),
  job: (id) => adminAxiosInstance.get(ENDPOINTS.admin.job, { params: { id } }),

  jobApplications: (params) => adminAxiosInstance.get(ENDPOINTS.admin.jobApplications, { params }),
  jobApplication: (id) => adminAxiosInstance.get(ENDPOINTS.admin.jobApplication, { params: { id } }),

  gigs: (params) => adminAxiosInstance.get(ENDPOINTS.admin.gigs, { params }),
  gig: (id) => adminAxiosInstance.get(ENDPOINTS.admin.gig, { params: { id } }),

  clients: (params) => adminAxiosInstance.get(ENDPOINTS.admin.clients, { params }),
  client: (id) => adminAxiosInstance.get(ENDPOINTS.admin.client, { params: { id } }),
};