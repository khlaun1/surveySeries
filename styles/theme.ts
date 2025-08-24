"use client";
import { createTheme } from "@mui/material/styles";

// Simple, Google-like Material theme (light, subtle elevation, rounded corners)
export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: { main: '#1a73e8' }, // Google blue
    secondary: { main: '#5f6368' },
    background: { default: '#fafafa', paper: '#ffffff' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontSize: 14,
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 500, fontSize: '2rem' },
    h2: { fontWeight: 500, fontSize: '1.5rem' },
    h4: { fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: {
        root: { borderRadius: 8, boxShadow: 'none' },
        contained: { boxShadow: 'none' },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 1 },
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 1 },
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiAppBar: {
      defaultProps: { elevation: 1 },
      styleOverrides: { root: { boxShadow: 'none' } },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRadius: 0, boxShadow: 'none' } },
    },
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#f5f7fb',
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: { root: { borderBottom: '1px solid rgba(0,0,0,0.08)' } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 16, fontWeight: 500 } },
    },
    MuiSnackbar: {
      styleOverrides: { root: { '& .MuiAlert-root': { borderRadius: 8 } } },
    },
  },
});
