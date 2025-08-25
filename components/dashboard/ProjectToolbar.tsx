"use client";

import { 
  Box, 
  TextField, 
  InputAdornment,
  IconButton,
  Typography,
  Stack
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useData } from '@/contexts/DataContext';

export default function ProjectToolbar() {
  const { searchTerm, setSearchTerm, selectedSeries, filteredProjects } = useData();

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Stack>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#000000',
              mb: 0.5,
            }}
          >
            {selectedSeries ? selectedSeries.name : 'Select a series'} ({filteredProjects.length})
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            {selectedSeries ? `Manage projects for ${selectedSeries.name}` : 'Choose a survey series from the sidebar to view projects'}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search Terms"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ 
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              height: 40,
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#666666', fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={handleClearSearch}
                  sx={{ 
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    }
                  }}
                >
                  <Clear sx={{ fontSize: 18 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
