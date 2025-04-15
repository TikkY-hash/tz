import api from '@/config/axios';
import {
  CreateProjectDto,
  GetProjectsParams,
  GetProjectsResponse,
  Project,
} from '@/interfaces/project.interface';

export const createProject = async (data: CreateProjectDto): Promise<Project> => {
  const response = await api.post<Project>('/projects', data);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

export const refreshProject = async (id: number): Promise<Project> => {
  const response = await api.put<Project>(`/projects/${id}/update`);
  return response.data;
};

export const getProjects = async (params: GetProjectsParams): Promise<GetProjectsResponse> => {
  const response = await api.get<GetProjectsResponse>('/projects', { params });
  return response.data;
};
