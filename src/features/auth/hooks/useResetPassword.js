import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,

    onSuccess: () => {
      toast.success("Password reset successfully");
    },

    onError: (error) => {
      const backendMessage =
        error.response?.data?.message || error.response?.data;

      const message =
        backendMessage === "Old password is incorrect"
          ? "Current password is incorrect"
          : backendMessage || "Unable to reset password. Please try again.";

      toast.error(message);
    },
  });
};
