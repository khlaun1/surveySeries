"use client";

import { Backdrop, CircularProgress } from '@mui/material';
import { useUI } from '@/contexts/UIContext';

export default function GlobalSpinner() {
  const { isLoading } = useUI();

  return (
    <Backdrop
      open={isLoading}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
