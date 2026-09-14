import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const contractsApi = {
  list: (params) => axiosInstance.get(ENDPOINTS.contracts.list, { params }),
  getById: (id) => axiosInstance.get(ENDPOINTS.contracts.byId(id)),
  updateProgress: (contractId, progress) =>
    axiosInstance.patch(ENDPOINTS.contracts.progress, null, { params: { contractId, progress } }),
  complete: (id) => axiosInstance.patch(ENDPOINTS.contracts.complete(id)),
  activate: (id) => axiosInstance.patch(ENDPOINTS.contracts.activate(id)),
  breakContract: (id, payload) => axiosInstance.patch(ENDPOINTS.contracts.breakContract(id), payload),
};