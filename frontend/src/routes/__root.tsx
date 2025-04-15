import { RootRouteComponent } from "@/pages";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootRouteComponent,
});
