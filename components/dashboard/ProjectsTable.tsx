"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { useData } from '@/contexts/DataContext';
import { formatDate } from '@/lib/utils';
import ProjectRowMenu from './ProjectRowMenu';
import { SurveyProject } from '@/lib/types';

interface ProjectsTableProps {
  onEditProject: (project: SurveyProject) => void;
  onDeleteProject: (project: SurveyProject) => void;
  onChangeStatus: (project: SurveyProject, newStatus: string) => void;
  onAddTerm: () => void;
}

export default function ProjectsTable({ 
  onEditProject, 
  onDeleteProject, 
  onChangeStatus,
  onAddTerm,
}: ProjectsTableProps) {
  const { filteredProjects, selectProject, selectedProjectId, searchTerm, selectedSeries } = useData();

  const handleRowDoubleClick = (project: SurveyProject) => {
    selectProject(project.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'default';
      case 'Published': return 'info';
      case 'Live': return 'success';
      case 'Closed': return 'error';
      default: return 'default';
    }
  };

  if (filteredProjects.length === 0) {
    const isSearching = !!searchTerm.trim();
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          py: 10,
          textAlign: 'center',
          minHeight: 240,
        }}
      >
        {isSearching ? (
          <>
            <Search sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
              No results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try a different search.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              No terms yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedSeries ? `Start by adding a term to ${selectedSeries.name}.` : 'Select a series to add a term.'}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={onAddTerm}
              disabled={!selectedSeries}
            >
              Add Term
            </Button>
          </>
        )}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Term Title</strong></TableCell>
            <TableCell align="center"><strong>Course Sections</strong></TableCell>
            <TableCell align="center"><strong>Enrollments</strong></TableCell>
            <TableCell><strong>Survey Template</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Created</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow
              key={project.id}
              hover
              selected={selectedProjectId === project.id}
              onDoubleClick={() => handleRowDoubleClick(project)}
              sx={{ 
                cursor: 'pointer',
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {project.termTitle}
                </Typography>
              </TableCell>
              <TableCell align="center">{project.courseSections}</TableCell>
              <TableCell align="center">{project.enrollments}</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {project.surveyTemplate}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={project.status} 
                  color={getStatusColor(project.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(project.createdAt)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <ProjectRowMenu
                  project={project}
                  onEdit={onEditProject}
                  onDelete={onDeleteProject}
                  onChangeStatus={onChangeStatus}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
