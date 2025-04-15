import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';

import { useAuth } from '@/store/auth';

export const Header = () => {
  const clearTokens = useAuth(state => state.clearTokens);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokens();
    navigate({ to: '/login' });
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: '#1976d2',
        paddingY: 0.5,
        paddingX: 4,
        boxShadow: 3,
        mb: 3,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            edge="start"
            color="inherit"
            href="https://github.com"
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon />
          </IconButton>
        </Box>

        <Button
          variant="outlined"
          color="inherit"
          onClick={handleLogout}
          sx={{
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              borderColor: '#ccc',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
