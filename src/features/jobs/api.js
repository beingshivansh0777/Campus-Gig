import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const jobsApi = {
  // Published jobs
  create: (payload) => axiosInstance.post(ENDPOINTS.jobs.create, payload),
  edit: (id, payload) => axiosInstance.patch(ENDPOINTS.jobs.byId(id), payload),
  delete: (jobId) => axiosInstance.delete(ENDPOINTS.jobs.delete, { params: { jobId } }),
  getById: (id) => axiosInstance.get(ENDPOINTS.jobs.byId(id)),
  list: (params) => axiosInstance.get(ENDPOINTS.jobs.list, { params }),
  myJobs: (params) => axiosInstance.get(ENDPOINTS.jobs.myJobs, { params }),

  // Drafts
  saveDraft: (payload) => axiosInstance.post(ENDPOINTS.jobs.draft, payload),
  updateDraft: (payload) => axiosInstance.patch(ENDPOINTS.jobs.draft, payload),
  listDrafts: () => axiosInstance.get(ENDPOINTS.jobs.drafts),
  getDraft: (draftId) => axiosInstance.get(ENDPOINTS.jobs.draftById(draftId)),
  deleteDraft: (draftId) => axiosInstance.delete(ENDPOINTS.jobs.draftById(draftId)),

  // Applicants / proposal actions (client side)
  getApplicants: (jobId, params) =>
    axiosInstance.get(ENDPOINTS.jobs.applicants(jobId), { params }),
  acceptProposal: (jobId, applicationId) =>
    axiosInstance.patch(ENDPOINTS.jobs.acceptProposal, null, { params: { jobId, applicationId } }),
  rejectProposal: (applicationId) =>
    axiosInstance.patch(ENDPOINTS.jobs.rejectProposal, null, { params: { applicationId } }),
};