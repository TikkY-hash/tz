import { Alert, Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { LoginDto } from '@/interfaces/auth.interface';
import { getErrorMessage } from './helpers';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: LoginDto) => void;
  isLoading: boolean;
  error: unknown;
}

export const AuthForm = ({ isLogin, onSubmit, isLoading, error }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const errorMessage = getErrorMessage(error, isLogin);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            ...(isLogin
              ? {}
              : {
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/]).*$/,
                    message: 'Must include upper/lowercase, number, and symbol',
                  },
                }),
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 2 }}>
          {isLoading
            ? isLogin
              ? 'Logging in...'
              : 'Registering...'
            : isLogin
            ? 'Login'
            : 'Register'}
        </Button>
      </Box>
    </form>
  );
};
