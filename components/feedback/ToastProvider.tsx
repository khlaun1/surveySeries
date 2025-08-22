"use client";

import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface Toast {
  id: string;
  message: string;
  variant: AlertColor;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

// Simple toast system using MUI components
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Expose toast function globally (simple approach for this demo)
  useEffect(() => {
    (window as any).showToast = (message: string, variant: AlertColor = 'info') => {
      const id = `toast-${Date.now()}`;
      setToasts(prev => [...prev, { id, message, variant }]);
    };
  }, []);

  const handleClose = (toastId: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  return (
    <>
      {children}
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={4000}
          onClose={() => handleClose(toast.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => handleClose(toast.id)} 
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
