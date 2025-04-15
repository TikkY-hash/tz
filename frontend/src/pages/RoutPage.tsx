import { GlobalSnackbar } from "@/components/GlobalSnackbar";
import { Header } from "@/components/Header";
import { useAuth } from "@/store/auth";
import { Container, CssBaseline } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export const RootRouteComponent = () => {
  const { accessToken, refreshToken, isRefreshing } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (!accessToken && !refreshToken && !isRefreshing) {
      navigate({ to: "/login" });
    }
  }, [accessToken, refreshToken, isRefreshing, navigate]);

  return (
    <>
      <CssBaseline />
      {!isLoginPage && <Header />}
      <GlobalSnackbar />
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};
