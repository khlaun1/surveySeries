"use client";

import { 
  Box, 
  TextField, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useData } from '@/contexts/DataContext';
import { ProjectStatus } from '@/lib/types';

export default function ProjectToolbar() {
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter } = useData();

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center',
        py: 2 
      }}
    >
      <TextField
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        sx={{ minWidth: 300 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClearSearch}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={statusFilter || ''}
          label="Status Filter"
          onChange={(e) => setStatusFilter(e.target.value as ProjectStatus || null)}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
          <MenuItem value="Live">Live</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
