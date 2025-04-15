import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject, deleteProject, refreshProject } from "@/api/projects";
import { CreateProjectDto, Project } from "@/interfaces/project.interface";
import { AlertService } from "@/components/AlertService";

interface UseProjectActionsOptions {
  onAfterCreate?: () => void;
  onCreateError?: (e: Error) => void;
  onAfterRefresh?: (id: number) => void;
}

export const useProjectActions = (options?: UseProjectActionsOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Project, Error, CreateProjectDto>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      options?.onAfterCreate?.();
      AlertService.success("Project created successfully!");
    },
    onError: (error) => {
      AlertService.error("Failed to create project.");
      options?.onCreateError?.(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      AlertService.success("Project deleted successfully!");
    },
    onError: () => {
      AlertService.error("Failed to delete project.");
    },
  });

  const refreshMutation = useMutation({
    mutationFn: refreshProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      AlertService.success("Project updated successfully!");
    },
    onSettled: (_data, _error, id: number) => {
      options?.onAfterRefresh?.(id);
    },
    onError: () => {
      AlertService.error("Failed to update project.");
    },
  });

  return {
    create: createMutation.mutate,
    delete: deleteMutation.mutate,
    refresh: refreshMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isRefreshing: refreshMutation.isPending,
    mutations: {
      createMutation,
      deleteMutation,
      refreshMutation,
    },
  };
};
