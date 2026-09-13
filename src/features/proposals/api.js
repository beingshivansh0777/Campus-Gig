import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const proposalsApi = {
  myProposals: (filters, params) =>
    axiosInstance.post(ENDPOINTS.gig.proposals, filters, { params }),
  withdraw: (jobApplicationId) =>
    axiosInstance.patch(ENDPOINTS.gig.withdrawProposal(jobApplicationId)),
  update: (jobApplicationId, payload) =>
    axiosInstance.patch(ENDPOINTS.gig.proposalById(jobApplicationId), payload),
};