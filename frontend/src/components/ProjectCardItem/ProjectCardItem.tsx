import { Grid } from "@mui/material";
import { ReactNode } from "react";

export const ProjectCardItem = ({ children }: { children: ReactNode }) => (
  <Grid
    sx={{
      gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" },
    }}
  >
    {children}
  </Grid>
);
