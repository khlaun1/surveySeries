"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';
import { SurveyProject, ProjectStatus } from '@/lib/types';
import { canEditField } from '@/lib/validations';

interface AddEditProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (projectData: Omit<SurveyProject, 'id' | 'createdAt'>) => void;
  project?: SurveyProject | null;
  mode: 'add' | 'edit';
}

export default function AddEditProjectDialog({
  open,
  onClose,
  onSave,
  project,
  mode
}: AddEditProjectDialogProps) {
  const [formData, setFormData] = useState({
    termTitle: '',
    courseSections: 0,
    enrollments: 0,
    surveyTemplate: 'Default Survey Template',
    status: 'Draft' as ProjectStatus,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when dialog opens
  useEffect(() => {
    if (open) {
      if (mode === 'edit' && project) {
        setFormData({
          termTitle: project.termTitle,
          courseSections: project.courseSections,
          enrollments: project.enrollments,
          surveyTemplate: project.surveyTemplate,
          status: project.status,
        });
      } else {
        // Reset for add mode
        setFormData({
          termTitle: '',
          courseSections: 0,
          enrollments: 0,
          surveyTemplate: 'Default Survey Template',
          status: 'Draft',
        });
      }
      setErrors({});
    }
  }, [open, mode, project]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.termTitle.trim()) {
      newErrors.termTitle = 'Term title is required';
    }

    if (formData.courseSections < 0) {
      newErrors.courseSections = 'Course sections cannot be negative';
    }

    if (formData.enrollments < 0) {
      newErrors.enrollments = 'Enrollments cannot be negative';
    }

    if (!formData.surveyTemplate.trim()) {
      newErrors.surveyTemplate = 'Survey template is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const isFieldDisabled = (field: string) => {
    if (mode === 'add') return false;
    if (!project) return false;
    return !canEditField(project.status, field as any);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {mode === 'add' ? 'Add New Project' : 'Edit Project'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Term Title"
                value={formData.termTitle}
                onChange={(e) => handleChange('termTitle', e.target.value)}
                disabled={isFieldDisabled('termTitle')}
                error={!!errors.termTitle}
                helperText={errors.termTitle}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Course Sections"
                type="number"
                value={formData.courseSections}
                onChange={(e) => handleChange('courseSections', parseInt(e.target.value) || 0)}
                disabled={isFieldDisabled('courseSections')}
                error={!!errors.courseSections}
                helperText={errors.courseSections}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Enrollments"
                type="number"
                value={formData.enrollments}
                onChange={(e) => handleChange('enrollments', parseInt(e.target.value) || 0)}
                disabled={isFieldDisabled('enrollments')}
                error={!!errors.enrollments}
                helperText={errors.enrollments}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Survey Template"
                value={formData.surveyTemplate}
                onChange={(e) => handleChange('surveyTemplate', e.target.value)}
                disabled={isFieldDisabled('surveyTemplate')}
                error={!!errors.surveyTemplate}
                helperText={errors.surveyTemplate}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Published">Published</MenuItem>
                  <MenuItem value="Live">Live</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          {mode === 'add' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
