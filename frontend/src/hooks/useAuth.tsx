import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { login, register as registerApi } from '@/api/auth';
import { AuthResponse, LoginDto } from '@/interfaces/auth.interface';
import { useAuth } from '@/store/auth';

interface UseAuthMutationOptions {
  onSuccess?: (tokens: AuthResponse) => void;
}

export const useAuthMutation = (isLogin: boolean, options?: UseAuthMutationOptions) => {
  const navigate = useNavigate();
  const setTokens = useAuth(s => s.setTokens);

  const mutationFn = isLogin ? login : registerApi;

  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn,
    onSuccess: tokens => {
      setTokens(tokens);
      options?.onSuccess?.(tokens);
      navigate({ to: '/projects' });
    },
  });
};
