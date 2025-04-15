import { Box, Button, useMediaQuery, useTheme } from '@mui/material';

interface LoadMoreButtonProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onClick: () => void;
}

export const LoadMoreButton = ({
  hasNextPage,
  isFetchingNextPage,
  onClick,
}: LoadMoreButtonProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!hasNextPage) return null;

  return (
    <Box mt={3} textAlign="center">
      <Button
        variant="contained"
        onClick={onClick}
        disabled={isFetchingNextPage}
        sx={{ width: isMobile ? '100%' : 'auto' }}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </Button>
    </Box>
  );
};
