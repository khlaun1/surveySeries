"use client";

import { Backdrop, CircularProgress } from '@mui/material';
import { useUI } from '@/contexts/UIContext';

export default function GlobalSpinner() {
  const { isLoading } = useUI();

  return (
    <Backdrop
      open={isLoading}
      sx={{ color: (t) => t.palette.primary.main, zIndex: (t) => t.zIndex.modal + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
