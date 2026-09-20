import axiosInstance from '../../api/axiosInstance';

export const reportsApi = {
  create: (payload) => axiosInstance.post('/report/report', payload),
};