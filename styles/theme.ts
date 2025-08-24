"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#2563eb', // Bold blue
      dark: '#1d4ed8',
      light: '#3b82f6',
    },
    secondary: {
      main: '#000000', // Black for contrast
      light: '#333333',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    divider: '#000000',
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
    warning: {
      main: '#f59e0b',
    },
  },
  typography: { 
    fontSize: 14,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 0, // Sharp corners for neobrutalism
  },
  components: {
    MuiButton: { 
      defaultProps: { variant: "contained" },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 0,
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          transition: 'all 0.1s ease',
          '&:hover': {
            transform: 'translate(-2px, -2px)',
            boxShadow: '6px 6px 0px #000000',
          },
          '&:active': {
            transform: 'translate(0px, 0px)',
            boxShadow: '2px 2px 0px #000000',
          },
        },
        containedPrimary: {
          backgroundColor: '#2563eb',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1d4ed8',
          },
        },
        outlined: {
          backgroundColor: '#ffffff',
          color: '#000000',
          borderColor: '#000000',
          '&:hover': {
            backgroundColor: '#f3f4f6',
            borderColor: '#000000',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            boxShadow: '2px 2px 0px #000000',
            backgroundColor: '#ffffff',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000000',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2563eb',
              borderWidth: '2px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000000',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px #000000',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px #000000',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px #000000',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#f3f4f6',
            fontWeight: 700,
            borderBottom: '2px solid #000000',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #000000',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #000000',
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0px 4px 0px #000000',
          border: '2px solid #000000',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: '2px solid #000000',
          borderLeft: 'none',
          boxShadow: '4px 0px 0px #000000',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          margin: '2px',
          border: '1px solid transparent',
          '&:hover': {
            backgroundColor: '#f3f4f6',
            border: '1px solid #000000',
          },
          '&.Mui-selected': {
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: '1px solid #000000',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#1d4ed8',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: '3px solid #000000',
          boxShadow: '8px 8px 0px #000000',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: 0,
            border: '2px solid #000000',
            boxShadow: '4px 4px 0px #000000',
          },
        },
      },
    },
  },
});
