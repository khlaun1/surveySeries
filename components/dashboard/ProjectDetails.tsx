"use client";

import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { useData } from '@/contexts/DataContext';
import { formatDate } from '@/lib/utils';

export default function ProjectDetails() {
  const { selectedProject } = useData();

  if (!selectedProject) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          py: 8,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a project to view details
        </Typography>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'default';
      case 'Published': return 'info';
      case 'Live': return 'success';
      case 'Closed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card elevation={1}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {selectedProject.termTitle}
          </Typography>
          <Chip 
            label={selectedProject.status} 
            color={getStatusColor(selectedProject.status) as any}
            size="small"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Survey Template
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedProject.surveyTemplate}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Created Date
            </Typography>
            <Typography variant="body1">
              {formatDate(selectedProject.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Course Sections
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedProject.courseSections}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Enrollments
            </Typography>
            <Typography variant="body1">
              {selectedProject.enrollments}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Project ID:</strong> {selectedProject.id}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
