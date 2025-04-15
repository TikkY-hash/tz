import { ProjectCard } from '@/components/ProjectCard';
import { ProjectCardSkeleton } from '@/components/ProjectCardSkeleton';
import { Project } from '@/interfaces/project.interface';

import { EmptyState } from '../EmptyState';
import { ProjectCardItem } from '../ProjectCardItem';

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
  onRefresh: (id: number) => void;
  search: string;
  order: string;
  refreshingIds: number[];
}

export const ProjectList = ({
  projects,
  isLoading,
  isDeleting,
  refreshingIds,
  onDelete,
  onRefresh,
  search,
  order,
}: ProjectListProps) => {
  if (isLoading) {
    return (
      <>
        {[...Array(projects.length)].map((_, i) => (
          <ProjectCardItem key={i}>
            <ProjectCardSkeleton />
          </ProjectCardItem>
        ))}
      </>
    );
  }

  if (projects.length === 0) {
    return <EmptyState isFiltered={!!(search || order !== 'asc')} />;
  }

  return (
    <>
      {projects.map(project => (
        <ProjectCardItem key={project.id}>
          <ProjectCard
            project={project}
            onDelete={onDelete}
            onRefresh={onRefresh}
            isDeleting={isDeleting}
            isRefreshing={refreshingIds.includes(project.id)}
          />
        </ProjectCardItem>
      ))}
    </>
  );
};
