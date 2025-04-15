import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { queryClient } from "@/constants/main-constants";

export const router = createRouter({
  routeTree,
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
