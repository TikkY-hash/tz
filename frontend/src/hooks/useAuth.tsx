import { useMutation } from "@tanstack/react-query";
import { login, register as registerApi } from "@/api/auth";
import { useAuth } from "@/store/auth";
import { useNavigate } from "@tanstack/react-router";
import { AuthResponse, LoginDto } from "@/interfaces/auth.interface";

interface UseAuthMutationOptions {
  onSuccess?: (tokens: AuthResponse) => void;
}

export const useAuthMutation = (
  isLogin: boolean,
  options?: UseAuthMutationOptions
) => {
  const navigate = useNavigate();
  const setTokens = useAuth((s) => s.setTokens);

  const mutationFn = isLogin ? login : registerApi;

  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn,
    onSuccess: (tokens) => {
      setTokens(tokens);
      options?.onSuccess?.(tokens);
      navigate({ to: "/projects" });
    },
  });
};
