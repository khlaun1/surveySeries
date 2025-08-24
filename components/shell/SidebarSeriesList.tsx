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
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="h6">Survey Series</Typography>
      </Box>
      
      <List sx={{ py: 1, px: 1 }}>
        {sortedSeries.map((seriesItem) => (
          <ListItemButton
            key={seriesItem.id}
            selected={selectedSeriesId === seriesItem.id}
            onClick={() => selectSeries(seriesItem.id)}
            sx={{
              py: 1.25,
              px: 2,
              mb: 0.5,
              borderRadius: 1,
            }}
          >
            <ListItemText 
              primary={seriesItem.name}
              secondary={`${seriesItem.projects.length} projects`}
              primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
