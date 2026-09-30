import axios from "axios";
import { useAuthStore } from "../features/auth/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) =>
    error ? p.reject(error) : p.resolve(token)
  );

  queue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    /*
     * IMPORTANT:
     * Login failure with 401 should NOT trigger
     * the refresh-token flow.
     *
     * Backend can return 401 for invalid credentials,
     * so we let the original login error reach useLogin.
     */
    const isLoginRequest = originalRequest?.url?.includes("/auth/login");

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isLoginRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.get(
          "/auth/refresh-token"
        );

        const newToken = data["Access Token"];

        useAuthStore.getState().setToken(newToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        useAuthStore.getState().logout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;