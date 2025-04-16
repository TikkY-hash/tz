export const getErrorMessage = (error: unknown, isLogin: boolean): React.ReactNode => {
  if (!error) return null;

  const err = error as {
    response?: { data?: { message?: string } };
  };

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  return isLogin ? 'Login failed' : 'Registration failed';
};
