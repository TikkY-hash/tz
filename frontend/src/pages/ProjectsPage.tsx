import {
  Box,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useProjectActions } from "@/hooks/useProjectActions";
import { useProjectsQuery } from "@/hooks/useProjectsQuery";
import { ProjectFilters } from "@/components/ProjectFilters";

import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { ProjectList } from "@/components/ProjectList";
import { LoadMoreButton } from "@/components/LoadMoreButton";

export const ProjectsPage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [repo, setRepo] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProjectsQuery(order, search);
  const [refreshingIds, setRefreshingIds] = useState<number[]>([]);

  const projects = data?.pages.flatMap((page) => page.data) || [];

  const {
    create,
    delete: deleteProject,
    refresh: rawRefresh,
    isCreating,
    isDeleting,
  } = useProjectActions({
    onAfterCreate: () => {
      setModalOpen(false);
      setRepo("");
    },
    onAfterRefresh: (id) => {
      setRefreshingIds((prev) => prev.filter((i) => i !== id));
    },
  });

  const refresh = (id: number) => {
    if (refreshingIds.includes(id)) return;

    setRefreshingIds((prev) => [...prev, id]);
    rawRefresh(id);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          position: isMobile ? "static" : "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
          pb: 2,
          pt: 1,
          paddingTop: "20px",
        }}
      >
        <ProjectFilters
          order={order}
          search={search}
          onOrderChange={setOrder}
          onSearchChange={setSearch}
        />
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{ width: isMobile ? "100%" : "auto" }}
        >
          Add Project
        </Button>
      </Stack>

      <Grid
        container
        spacing={6.3}
        columns={{ xs: 12, sm: 12, md: 12 }}
        justifyContent={{
          xs: "center",
          sm: !projects.length ? "center" : "flex-start",
        }}
      >
        <ProjectList
          projects={projects}
          isLoading={isLoading || isFetchingNextPage}
          isDeleting={isDeleting}
          onDelete={deleteProject}
          onRefresh={refresh}
          search={search}
          order={order}
          refreshingIds={refreshingIds}
        />
      </Grid>

      <LoadMoreButton
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      />

      <CreateProjectDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        repo={repo}
        onChange={setRepo}
        onSubmit={() => repo.trim() && create({ repositoryPath: repo.trim() })}
        isLoading={isCreating}
      />
    </Box>
  );
};
