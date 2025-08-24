"use client";

import { Backdrop, Box, Typography } from '@mui/material';
import { useUI } from '@/contexts/UIContext';

export default function GlobalSpinner() {
  const { isLoading } = useUI();

  return (
    <Backdrop
      open={isLoading}
      sx={{
        color: '#000',
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Neobrutalist spinner: stacked squares */}
        <Box
          sx={{
            position: 'relative',
            width: 64,
            height: 64,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              border: '3px solid #000',
              backgroundColor: '#2563eb',
              boxShadow: '6px 6px 0px #000',
              animation: 'brutalSpin 1s linear infinite',
              transformOrigin: 'center',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 8,
              border: '3px solid #000',
              backgroundColor: '#fff',
              boxShadow: '6px 6px 0px #000',
              animation: 'brutalSpinReverse 1s linear infinite',
              transformOrigin: 'center',
            }}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: 800,
            letterSpacing: '0.02em',
            color: '#000',
            textTransform: 'uppercase',
          }}
        >
          Loading…
        </Typography>
      </Box>

      <style jsx global>{`
        @keyframes brutalSpin {
          0% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(10deg) translate(-2px, -2px); }
          100% { transform: rotate(360deg) translate(0, 0); }
        }
        @keyframes brutalSpinReverse {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </Backdrop>
  );
}
