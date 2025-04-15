export const getErrorMessage = (error: unknown, isLogin: boolean): React.ReactNode => {
  const err = error as {
    response?: { data?: { message?: string } };
  };

  return err?.response?.data?.message || (isLogin ? 'Login failed' : 'Registration failed');
};
