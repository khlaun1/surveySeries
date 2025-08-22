"use client";

import { 
  Box, 
  Typography, 
  Button, 
  Stack 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useData } from '@/contexts/DataContext';

interface DashboardHeaderProps {
  onAddTerm: () => void;
}

export default function DashboardHeader({ onAddTerm }: DashboardHeaderProps) {
  const { selectedSeries } = useData();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        pb: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Survey Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {selectedSeries ? selectedSeries.name : 'Select a series to view projects'}
        </Typography>
      </Stack>
      
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onAddTerm}
        disabled={!selectedSeries}
        sx={{ minWidth: 120 }}
      >
        Add Term
      </Button>
    </Box>
  );
}
