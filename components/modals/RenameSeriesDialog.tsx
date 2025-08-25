"use client";

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';

interface RenameSeriesDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName: string;
}

export default function RenameSeriesDialog({ open, onClose, onSave, initialName }: RenameSeriesDialogProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName(initialName || '');
      setError('');
    }
  }, [open, initialName]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Series name is required');
      return;
    }
    onSave(trimmed);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Rename Series</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            autoFocus
            label="Series Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            error={!!error}
            helperText={error}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}


