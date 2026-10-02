import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";

export const authApi = {
  signup: (payload) => axiosInstance.post(ENDPOINTS.auth.signup, payload),

  login: (payload) => axiosInstance.post(ENDPOINTS.auth.login, payload),

  sendVerificationOtp: () => axiosInstance.get(ENDPOINTS.auth.verifyOtp),

  verifyEmail: (otp) =>
    axiosInstance.patch(ENDPOINTS.auth.verifyOtp, null, { params: { otp } }),

  sendForgotPasswordOtp: (email) =>
    axiosInstance.get(ENDPOINTS.auth.forgotPasswordOtp, { params: { email } }),

  resetPassword: (payload) =>
    axiosInstance.patch(ENDPOINTS.auth.resetPassword, payload),

  getProfile: () => axiosInstance.get(ENDPOINTS.auth.profile),

  editProfile: (payload) =>
    axiosInstance.patch(ENDPOINTS.auth.editProfile, payload),
};
