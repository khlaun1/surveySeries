"use client";

import { 
  List, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  Box 
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { sortByName } from '@/lib/utils';

export default function SidebarSeriesList() {
  const { series, selectedSeriesId, selectSeries } = useData();
  const sortedSeries = sortByName(series);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          px: 2, 
          py: 1, 
          borderBottom: 1, 
          borderColor: 'divider',
          fontWeight: 600 
        }}
      >
        Survey Series
      </Typography>
      <List sx={{ py: 0 }}>
        {sortedSeries.map((seriesItem) => (
          <ListItemButton
            key={seriesItem.id}
            selected={selectedSeriesId === seriesItem.id}
            onClick={() => selectSeries(seriesItem.id)}
            sx={{
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.main',
                },
              },
            }}
          >
            <ListItemText 
              primary={seriesItem.name}
              secondary={`${seriesItem.projects.length} projects`}
              primaryTypographyProps={{
                fontWeight: selectedSeriesId === seriesItem.id ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
