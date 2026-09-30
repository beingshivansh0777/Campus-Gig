import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endPoints";

export const createTechnicalIssue = async (data) => {
  const response = await axiosInstance.post(
    ENDPOINTS.technicalSupport.create,
    data
  );

  return response;
};

export const getMyTechnicalIssues = async (params = {}) => {
  const response = await axiosInstance.get(
    ENDPOINTS.technicalSupport.list,
    {
      params,
    }
  );

  return response.data;
};

export const getTechnicalIssueById = async (id) => {
  const response = await axiosInstance.get(
    ENDPOINTS.technicalSupport.byId(id)
  );

  return response.data;
};