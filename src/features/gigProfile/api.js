import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const gigProfileApi = {
  becomeGig: (payload) => axiosInstance.post(ENDPOINTS.gig.becomeGig, payload),
  getMyGigProfile: () => axiosInstance.get(ENDPOINTS.gig.myProfile),
  updateGigProfile: (payload) => axiosInstance.patch(ENDPOINTS.gig.myProfile, payload),
};