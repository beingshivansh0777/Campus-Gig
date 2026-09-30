import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import { useAuthStore } from "../authStore";

export const useLogin = () => {
  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsGig = useAuthStore((state) => state.setIsGig);

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: async (response) => {
      const token = response.data["Access Token"];

      setToken(token);

      try {
        const profileRes = await authApi.getProfile();

        setUser(profileRes.data);

        setIsGig(
          profileRes.data.roles?.includes("GIG") ?? false
        );
      } catch (error) {
        console.error("GET PROFILE ERROR:", error);
      }

      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("LOGIN ERROR:", error.response?.data || error);
    },
  });
};