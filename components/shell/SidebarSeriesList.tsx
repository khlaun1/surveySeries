"use client";

import { 
  List, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  Box,
  Divider 
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { sortByName } from '@/lib/utils';

export default function SidebarSeriesList() {
  const { series, selectedSeriesId, selectSeries } = useData();
  const sortedSeries = sortByName(series);

  return (
    <Box 
      sx={{ 
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        sx={{
          px: 3, 
          py: 2,
          borderBottom: '2px solid #000000',
          backgroundColor: '#f3f4f6',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            fontSize: '1rem',
            color: '#000000',
            letterSpacing: '-0.025em',
          }}
        >
          Survey Series
        </Typography>
      </Box>
      
      <List sx={{ py: 1, px: 1 }}>
        {sortedSeries.map((seriesItem) => (
          <ListItemButton
            key={seriesItem.id}
            selected={selectedSeriesId === seriesItem.id}
            onClick={() => selectSeries(seriesItem.id)}
            sx={{
              py: 1.5,
              px: 2,
              mb: 1,
              borderRadius: 0,
              border: '1px solid transparent',
              transition: 'all 0.1s ease',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                border: '1px solid #000000',
                transform: 'translate(-1px, -1px)',
                boxShadow: '2px 2px 0px #000000',
              },
              '&.Mui-selected': {
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: '1px solid #000000',
                boxShadow: '2px 2px 0px #000000',
                '&:hover': {
                  backgroundColor: '#1d4ed8',
                  transform: 'translate(-1px, -1px)',
                  boxShadow: '3px 3px 0px #000000',
                },
              },
            }}
          >
            <ListItemText 
              primary={seriesItem.name}
              secondary={`${seriesItem.projects.length} projects`}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '0.875rem',
                color: selectedSeriesId === seriesItem.id ? '#ffffff' : '#000000',
              }}
              secondaryTypographyProps={{
                fontWeight: 400,
                fontSize: '0.75rem',
                color: selectedSeriesId === seriesItem.id ? '#e5e7eb' : '#666666',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
