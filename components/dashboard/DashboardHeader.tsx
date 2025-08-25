"use client";

import { 
  Box, 
  Typography, 
  Button, 
  Stack,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useData } from '@/contexts/DataContext';

interface DashboardHeaderProps {
  onAddTerm: () => void;
}

export default function DashboardHeader({ onAddTerm }: DashboardHeaderProps) {
  const { selectedSeries } = useData();

  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs 
        aria-label="breadcrumb" 
        sx={{ 
          mb: 2,
          '& .MuiBreadcrumbs-separator': {
            color: '#000000',
            fontWeight: 600,
          }
        }}
      >
        <Link 
          underline="hover" 
          color="primary" 
          href="/dashboard" 
          sx={{ 
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
            }
          }}
        >
          Survey Projects
        </Link>
      </Breadcrumbs>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 2,
        }}
      >
        <Stack spacing={1}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              fontSize: '2rem',
              color: '#000000',
              letterSpacing: '-0.025em'
            }}
          >
            Survey Projects
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            All your survey projects are listed below
          </Typography>
        </Stack>
        
        <Button
          variant="contained"
          onClick={onAddTerm}
          disabled={!selectedSeries}
          startIcon={<Add />}
          sx={{ 
            minWidth: 140,
            height: 40,
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Add Term
        </Button>
      </Box>
    </Box>
  );
}
