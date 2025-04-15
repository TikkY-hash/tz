// src/routes/projects.tsx
import { ProjectsPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});
