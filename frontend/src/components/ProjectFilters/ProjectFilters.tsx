import { debounce, MenuItem, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

interface ProjectFiltersProps {
  order: 'asc' | 'desc';
  search: string;
  onOrderChange: (val: 'asc' | 'desc') => void;
  onSearchChange: (val: string) => void;
}

export const ProjectFilters = ({
  order,
  search,
  onOrderChange,
  onSearchChange,
}: ProjectFiltersProps) => {
  const [searchInput, setSearchInput] = useState(search);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const debouncedSearchChange = useMemo(() => debounce(onSearchChange, 300), [onSearchChange]);

  useEffect(() => {
    debouncedSearchChange(searchInput);
  }, [searchInput, debouncedSearchChange]);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={2}
      sx={{
        width: isMobile ? '100%' : 'auto',
        marginBottom: isMobile ? '18px' : 'auto',
      }}
    >
      <TextField
        label="Order"
        select
        value={order}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onOrderChange(event.target.value as 'asc' | 'desc')
        }
        size="small"
        fullWidth
      >
        <MenuItem value="asc">Asc</MenuItem>
        <MenuItem value="desc">Desc</MenuItem>
      </TextField>

      <TextField
        label="Search"
        fullWidth
        value={searchInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(event.target.value)
        }
        size="small"
        sx={{}}
      />
    </Stack>
  );
};
