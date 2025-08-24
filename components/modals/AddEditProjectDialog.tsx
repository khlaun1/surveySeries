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

  // String mirrors for numeric inputs to avoid leading zero artifacts while typing
  const [courseSectionsStr, setCourseSectionsStr] = useState('');
  const [enrollmentsStr, setEnrollmentsStr] = useState('');

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
        setCourseSectionsStr(String(project.courseSections ?? ''));
        setEnrollmentsStr(String(project.enrollments ?? ''));
      } else {
        // Reset for add mode
        setFormData({
          termTitle: '',
          courseSections: 0,
          enrollments: 0,
          surveyTemplate: 'Default Survey Template',
          status: 'Draft',
        });
        setCourseSectionsStr('');
        setEnrollmentsStr('');
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

  const handleNumericChange = (field: 'courseSections' | 'enrollments', valueStr: string) => {
    // Accept empty string for UX; map to 0 in state
    const sanitized = valueStr.replace(/[^0-9]/g, '');
    const numeric = sanitized === '' ? 0 : Math.max(0, parseInt(sanitized, 10) || 0);
    if (field === 'courseSections') setCourseSectionsStr(sanitized);
    if (field === 'enrollments') setEnrollmentsStr(sanitized);
    setFormData(prev => ({ ...prev, [field]: numeric }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
        {mode === 'add' ? 'Create Survey Project' : 'Edit Project'}
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
                InputLabelProps={{ shrink: true }}
                type="number"
                value={courseSectionsStr}
                onChange={(e) => handleNumericChange('courseSections', e.target.value)}
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
                InputLabelProps={{ shrink: true }}
                type="number"
                value={enrollmentsStr}
                onChange={(e) => handleNumericChange('enrollments', e.target.value)}
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
                InputLabelProps={{ shrink: true }}
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
