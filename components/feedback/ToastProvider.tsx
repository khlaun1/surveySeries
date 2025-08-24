"use client";

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useUI } from '@/contexts/UIContext';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts = [], dismissToast } = useUI();

  return (
    <>
      {children}
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={4000}
          onClose={() => dismissToast?.(toast.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => dismissToast?.(toast.id)} 
            severity={toast.variant}
            variant="filled"
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
