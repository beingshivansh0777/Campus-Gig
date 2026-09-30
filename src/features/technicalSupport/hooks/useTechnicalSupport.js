import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTechnicalIssue,
  getMyTechnicalIssues,
  getTechnicalIssueById,
} from "../api";

export const useCreateTechnicalIssue = () => {
  return useMutation({
    mutationFn: createTechnicalIssue,
  });
};

export const useMyTechnicalIssues = (params = {}) => {
  return useQuery({
    queryKey: ["technical-support", "my-issues", params],
    queryFn: () => getMyTechnicalIssues(params),
  });
};

export const useTechnicalIssue = (id) => {
  return useQuery({
    queryKey: ["technical-support", id],
    queryFn: () => getTechnicalIssueById(id),
    enabled: !!id,
  });
};
