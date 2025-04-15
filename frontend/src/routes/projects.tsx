// src/routes/projects.tsx
import { createFileRoute } from '@tanstack/react-router';

import { ProjectsPage } from '@/pages';

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
});
