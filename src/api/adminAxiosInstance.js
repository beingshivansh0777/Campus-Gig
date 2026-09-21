import axios from 'axios';
import { useAdminAuthStore } from '../features/admin/adminAuthStore';

const adminAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

adminAxiosInstance.interceptors.request.use((config) => {
  const token = useAdminAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAdminAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default adminAxiosInstance;