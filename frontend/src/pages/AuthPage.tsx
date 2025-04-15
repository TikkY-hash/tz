import { Container, Box } from "@mui/material";
import { useState } from "react";
import { AuthFormWrapper } from "@/components/AuthFormWrapper";
import { useAuthMutation } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { LoginDto } from "@/interfaces/auth.interface";

export const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const isLogin = tab === 0;

  const mutation = useAuthMutation(isLogin);

  const formKey = isLogin ? "login" : "register";

  const handleSubmit = (data: LoginDto) => mutation.mutate(data);

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <AuthFormWrapper
          tab={tab}
          setTab={setTab}
          onTabChange={() => mutation.reset()}
        >
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
            error={mutation.error}
            key={formKey}
          />
        </AuthFormWrapper>
      </Box>
    </Container>
  );
};
