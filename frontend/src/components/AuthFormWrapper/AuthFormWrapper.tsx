import { Paper, Tabs, Tab } from "@mui/material";
import { ReactNode } from "react";

interface AuthFormWrapperProps {
  tab: number;
  setTab: (val: number) => void;
  children: ReactNode;
  onTabChange?: () => void;
}

export const AuthFormWrapper = ({
  tab,
  setTab,
  children,
  onTabChange,
}: AuthFormWrapperProps) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Tabs
        value={tab}
        onChange={(_, val) => {
          setTab(val);
          onTabChange?.();
        }}
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>

      {children}
    </Paper>
  );
};
