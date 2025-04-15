export interface Project {
  id: number;
  name: string;
  owner: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: string;
  url: string;
  repoPath: string;
}

export interface GetProjectsResponse {
  data: Project[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface GetProjectsParams {
  order?: "asc" | "desc";
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateProjectDto {
  repositoryPath: string;
}
