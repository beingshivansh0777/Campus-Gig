import axiosInstance from '../../api/axiosInstance';

export const reportsApi = {
  create: (payload) => axiosInstance.post('/report/report', payload),
  myReports: (params) => axiosInstance.get('/report/reports', { params }),
};