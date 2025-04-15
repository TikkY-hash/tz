import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAuth } from "@/store/auth";
import { AuthPage } from "@/pages";

export const Route = createFileRoute("/login")({
  component: AuthPage,
  beforeLoad: () => {
    const token = useAuth.getState().accessToken;
    if (token) {
      throw redirect({ to: "/projects" });
    }
  },
});
