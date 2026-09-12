import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const profileApi = {
  getProfile: () => axiosInstance.get(ENDPOINTS.auth.profile),
  editProfile: (payload) => axiosInstance.patch(ENDPOINTS.auth.editProfile, payload),
};

export const skillsApi = {
  search: (keyword) =>
    axiosInstance.get(ENDPOINTS.skills.search, { params: { keyword, pageSize: 20 } }),
  create: (skillName) =>
    axiosInstance.post(ENDPOINTS.skills.add, null, { params: { skill: skillName } }),
};