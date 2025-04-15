import { Box, Grid, Typography } from '@mui/material';

interface EmptyStateProps {
  isFiltered?: boolean;
}

export const EmptyState = ({ isFiltered = false }: EmptyStateProps) => (
  <Grid sx={{ gridColumn: 'span 12' }}>
    <Box textAlign="center" mt={8}>
      <Typography variant="h6" color="text.secondary" mb={1}>
        {isFiltered ? 'No results found.' : 'You have no projects yet.'}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {isFiltered
          ? 'Try adjusting your search or filters.'
          : 'Click the "Add Project" button above to create your first one.'}
      </Typography>
    </Box>
  </Grid>
);
