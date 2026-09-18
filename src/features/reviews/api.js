import axiosInstance from '../../api/axiosInstance';

export const reviewsApi = {
  create: (contractId, payload) => axiosInstance.post(`/review/review/${contractId}`, payload),
  update: (contractId, payload) => axiosInstance.patch(`/review/review/${contractId}`, payload),
  delete: (contractId) => axiosInstance.delete(`/review/review/${contractId}`),
  list: (params) => axiosInstance.get('/review/reviews', { params }),
  getMine: (contractId) => axiosInstance.get(`/review/review/${contractId}/mine`),
};