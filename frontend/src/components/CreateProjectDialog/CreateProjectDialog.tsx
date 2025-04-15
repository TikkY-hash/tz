import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useMemo } from 'react';

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  repo: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CreateProjectDialog = ({
  open,
  onClose,
  repo,
  onChange,
  onSubmit,
  isLoading,
}: CreateProjectDialogProps) => {
  const isValidRepo = useMemo(() => {
    const regex = /^[^/]+\/[^/]+$/;
    return regex.test(repo);
  }, [repo]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <Box mt={1}>
          <TextField
            fullWidth
            label="GitHub repo path (e.g. facebook/react)"
            value={repo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            disabled={isLoading}
            error={!isValidRepo && repo.length > 0}
            helperText={!isValidRepo && repo.length > 0 ? 'Format must be like: owner/repo' : ' '}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={isLoading || !isValidRepo}>
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
