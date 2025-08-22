"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UIContextType } from '@/lib/types';

const UIContext = createContext<UIContextType | undefined>(undefined);

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; variant: string }>>([]);

  const showSpinner = () => setIsLoading(true);
  const hideSpinner = () => setIsLoading(false);

  const enqueueToast = (message: string, variant: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, variant }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const value: UIContextType = {
    isLoading,
    showSpinner,
    hideSpinner,
    enqueueToast,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}
