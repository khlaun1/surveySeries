"use client";

import { Backdrop, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Backdrop open sx={{ color: (t) => t.palette.primary.main, zIndex: (t) => t.zIndex.modal + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
