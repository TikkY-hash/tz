import { useThrottle } from "@/hooks/useThrottle";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DeleteModal } from "@/components/DeleteModal";
import { Project } from "@/interfaces/project.interface";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
  onRefresh: (id: number) => void;
  isDeleting: boolean;
  isRefreshing: boolean;
}

export const ProjectCard = ({
  project,
  onDelete,
  onRefresh,
  isDeleting,
  isRefreshing,
}: ProjectCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const throttledRefresh = useThrottle((id: number) => {
    onRefresh(id);
  }, 2000);

  const handleDeleteConfirm = () => {
    onDelete(project.id);
    setConfirmOpen(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: "250px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight="bold">
            {project.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Owner: {project.owner}
          </Typography>
          <Typography variant="body2">⭐ Stars: {project.stars}</Typography>
          <Typography variant="body2">🍴 Forks: {project.forks}</Typography>
          <Typography variant="body2">🐛 Issues: {project.issues}</Typography>
          <Typography variant="body2">
            🕒 Created:{" "}
            {new Date(Number(project.createdAt)).toLocaleDateString("en-GB")}
          </Typography>
        </Stack>

        <Stack spacing={1} sx={{ mt: 3 }}>
          <Button
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            fullWidth
          >
            VIEW ON GITHUB
          </Button>

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={() => throttledRefresh(project.id)}
              disabled={isRefreshing}
            >
              Refresh
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              fullWidth
              onClick={() => setConfirmOpen(true)}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <DeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        name={project.name}
        isLoading={isDeleting}
      />
    </>
  );
};
