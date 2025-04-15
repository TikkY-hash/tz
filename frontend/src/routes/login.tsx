import { createFileRoute, redirect } from '@tanstack/react-router';

import { AuthPage } from '@/pages';
import { useAuth } from '@/store/auth';

export const Route = createFileRoute('/login')({
  component: AuthPage,
  beforeLoad: () => {
    const token = useAuth.getState().accessToken;
    if (token) {
      throw redirect({ to: '/projects' });
    }
  },
});
