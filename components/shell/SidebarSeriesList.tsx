"use client";

import React, { useState } from 'react';
import { 
  List, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  Box,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import { Search, Clear, Add, Delete, Edit } from '@mui/icons-material';
import { SurveySeries } from '@/lib/types';
import { useData } from '@/contexts/DataContext';
import ConfirmDialog from '@/components/modals/ConfirmDialog';
import AddSeriesDialog from '@/components/modals/AddSeriesDialog';
import RenameSeriesDialog from '@/components/modals/RenameSeriesDialog';

export default function SidebarSeriesList() {
  const { 
    filteredSeries, 
    selectedSeriesId, 
    selectSeries, 
    seriesSearchTerm, 
    setSeriesSearchTerm,
    addSeries,
    deleteSeries,
    updateSeries,
    series,
  } = useData();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{ id: string; name: string } | null>(null);

  const handleClearSearch = () => setSeriesSearchTerm('');
  const handleDeleteClick = (id: string) => {
    setSeriesToDelete(id);
    setConfirmOpen(true);
  };
  const handleConfirmDelete = () => {
    if (seriesToDelete) deleteSeries(seriesToDelete);
    setSeriesToDelete(null);
  };
  const handleRenameClick = (id: string, name: string) => {
    setRenameTarget({ id, name });
    setRenameOpen(true);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Survey Projects</Typography>
        <Tooltip title="Add series">
          <IconButton size="small" onClick={(e) => { (e.currentTarget as HTMLElement).blur(); setAddOpen(true); }} aria-label="Add series">
            <Add fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ px: 2, pb: 1 }}>
        <TextField
          placeholder="Search Projects"
          value={seriesSearchTerm}
          onChange={(e) => setSeriesSearchTerm(e.target.value)}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#666666', fontSize: 18 }} />
              </InputAdornment>
            ),
            endAdornment: seriesSearchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <Clear sx={{ fontSize: 18 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {Array.isArray(series) && series.length === 0 ? (
        <Box sx={{ px: 2, py: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1.5,
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              backgroundColor: '#ffffff',
              borderRadius: 1
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>No series yet</Typography>
            <Button 
              size="small" 
              variant="contained" 
              startIcon={<Add />} 
              onClick={() => setAddOpen(true)}
            >
              Add Series
            </Button>
          </Box>
        </Box>
      ) : (
        <List sx={{ py: 1, px: 1 }}>
          {filteredSeries.map((seriesItem: SurveySeries) => (
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
              secondary={`${seriesItem.projects.length} Items`}
              primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
            <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
              <Tooltip title="Rename series">
                <IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); (e.currentTarget as HTMLElement).blur(); handleRenameClick(seriesItem.id, seriesItem.name); }} aria-label="Rename series">
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete series">
                <IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); (e.currentTarget as HTMLElement).blur(); handleDeleteClick(seriesItem.id); }} aria-label="Delete series">
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </ListItemButton>
          ))}
        </List>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Series"
        message="Are you sure you want to delete this series? This will also remove its projects."
        confirmText="Delete"
        confirmColor="error"
      />

      <AddSeriesDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(name) => addSeries(name)}
      />

      <RenameSeriesDialog
        open={renameOpen}
        onClose={() => setRenameOpen(false)}
        onSave={(name) => renameTarget && updateSeries(renameTarget.id, name)}
        initialName={renameTarget?.name || ''}
      />
    </Box>
  );
}
