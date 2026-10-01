import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api";
import { useAdminAuthStore } from "../adminAuthStore";
import { getErrorMessage } from "../../../lib/errorMessages";
import toast from "react-hot-toast";

// Admin Authentication

export const useAdminLogin = () => {
  const navigate = useNavigate();

  const setToken = useAdminAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: adminApi.login,

    onSuccess: (response) => {
      setToken(response.data["Access Token"]);

      toast.success("Welcome, Admin");

      navigate("/admin/dashboard");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useAdminRegister = () => {
  return useMutation({
    mutationFn: adminApi.register,

    onSuccess: () => {
      toast.success("Registered — your access is pending approval.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

// Admin Access

export const useAdminAdmins = (params = {}, enabled = true) => {
  return useQuery({
    queryKey: ["adminAdmins", params],
    queryFn: () =>
      adminApi
        .admins({
          page: params.page ?? 1,
          size: params.size ?? 10,
          direction: params.direction ?? "DESC",
          field: params.field ?? "createdAt",
          ...(params.keyword ? { keyword: params.keyword } : {}),
        })
        .then((res) => res.data),
    enabled,
  });
};

export const useAdminAccess = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => adminApi.adminAccess(id, status),

    onSuccess: (_, variables) => {
      if (variables.status === "ALLOWED") {
        toast.success("Admin approved successfully.");
      } else {
        toast.success("Admin access denied.");
      }

      queryClient.invalidateQueries({
        queryKey: ["adminAdmins"],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminPendingAdmins"],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminApprovedAdmins"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

// Admin Reports

export const useAdminReports = (params) =>
  useQuery({
    queryKey: ["adminReports", params],

    queryFn: () => adminApi.reports(params).then((res) => res.data),
  });

export const useAdminReport = (id) =>
  useQuery({
    queryKey: ["adminReport", id],

    queryFn: () => adminApi.report(id).then((res) => res.data),

    enabled: !!id,
  });

// Admin Jobs

export const useAdminJobs = (params) =>
  useQuery({
    queryKey: ["adminJobs", params],

    queryFn: () => adminApi.jobs(params).then((res) => res.data),
  });

export const useAdminJob = (id) =>
  useQuery({
    queryKey: ["adminJob", id],

    queryFn: () => adminApi.job(id).then((res) => res.data),

    enabled: !!id,
  });

// Admin Job Applications

export const useAdminJobApplications = (params) =>
  useQuery({
    queryKey: ["adminJobApplications", params],

    queryFn: () => adminApi.jobApplications(params).then((res) => res.data),
  });

export const useAdminJobApplication = (id) =>
  useQuery({
    queryKey: ["adminJobApplication", id],

    queryFn: () => adminApi.jobApplication(id).then((res) => res.data),

    enabled: !!id,
  });

// Admin Gigs

export const useAdminGigs = (params) =>
  useQuery({
    queryKey: ["adminGigs", params],

    queryFn: () => adminApi.gigs(params).then((res) => res.data),
  });

export const useAdminGig = (id) =>
  useQuery({
    queryKey: ["adminGig", id],

    queryFn: () => adminApi.gig(id).then((res) => res.data),

    enabled: !!id,
  });

// Admin Clients

export const useAdminClients = (params) =>
  useQuery({
    queryKey: ["adminClients", params],

    queryFn: () => adminApi.clients(params).then((res) => res.data),
  });

export const useAdminClient = (id) =>
  useQuery({
    queryKey: ["adminClient", id],

    queryFn: () => adminApi.client(id).then((res) => res.data),

    enabled: !!id,
  });

// Admin Dashboard

const DEFAULT_RANGE = {
  from: "2020-01-01",
  to: new Date().toISOString().split("T")[0],
};

export const useAdminStats = (dateRange) => {
  const range = {
    ...DEFAULT_RANGE,
    ...dateRange,
  };

  return useQuery({
    queryKey: ["adminStats", range],

    queryFn: () => adminApi.stats(range).then((res) => res.data),
  });
};

export const useAdminGrowthChart = (dateRange) => {
  const range = {
    ...DEFAULT_RANGE,
    ...dateRange,
  };

  return useQuery({
    queryKey: ["adminGrowthChart", range],

    queryFn: () => adminApi.growthChart(range).then((res) => res.data),
  });
};

export const useAdminPopularJobs = (dateRange) => {
  const range = {
    ...DEFAULT_RANGE,
    ...dateRange,
  };

  return useQuery({
    queryKey: ["adminPopularJobs", range],

    queryFn: () => adminApi.popularJobs(range).then((res) => res.data),
  });
};

// Technical Support

export const useAdminTechnicalSupports = (params) =>
  useQuery({
    queryKey: ["adminTechnicalSupports", params],

    queryFn: () => adminApi.technicalSupports(params).then((res) => res.data),
  });

export const useAdminTechnicalSupport = (id) =>
  useQuery({
    queryKey: ["adminTechnicalSupport", id],

    queryFn: () => adminApi.technicalSupport(id).then((res) => res.data),

    enabled: !!id,
  });

export const useUpdateTechnicalSupport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => adminApi.updateTechnicalSupport(id, status),

    onSuccess: (_, variables) => {
      toast.success(`Issue marked as ${variables.status}`);

      queryClient.invalidateQueries({
        queryKey: ["adminTechnicalSupports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminTechnicalSupport", variables.id],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
