import { Paper, Skeleton, Stack } from "@mui/material";

export const ProjectCardSkeleton = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: "250px",
      }}
    >
      <Stack spacing={1}>
        <Skeleton animation="wave" variant="text" width="60%" height={32} />
        <Skeleton animation="wave" variant="text" width="40%" />
        <Skeleton animation="wave" variant="text" width="80%" />
        <Skeleton animation="wave" variant="text" width="50%" />
        <Skeleton animation="wave" variant="text" width="30%" />
        <Skeleton animation="wave" variant="text" width="70%" />
      </Stack>

      <Stack spacing={1} sx={{ mt: 3 }}>
        <Skeleton animation="wave" variant="rounded" height={36} width="100%" />
        <Stack direction="row" spacing={1}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={36}
            width="100%"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={36}
            width="100%"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};
