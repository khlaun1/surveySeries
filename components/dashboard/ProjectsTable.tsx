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
  Box
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useData } from '@/contexts/DataContext';
import { formatDate } from '@/lib/utils';
import ProjectRowMenu from './ProjectRowMenu';
import { SurveyProject } from '@/lib/types';

interface ProjectsTableProps {
  onEditProject: (project: SurveyProject) => void;
  onDeleteProject: (project: SurveyProject) => void;
  onChangeStatus: (project: SurveyProject, newStatus: string) => void;
}

export default function ProjectsTable({ 
  onEditProject, 
  onDeleteProject, 
  onChangeStatus 
}: ProjectsTableProps) {
  const { filteredProjects, selectProject, selectedProjectId } = useData();

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
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          py: 12,
          textAlign: 'center',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          backgroundColor: '#ffffff',
          minHeight: 300,
        }}
      >
        <Box 
          sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            border: '2px solid #000000',
            boxShadow: '4px 4px 0px #000000',
          }}
        >
          <Search sx={{ fontSize: 32, color: '#666666' }} />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            color: '#000000',
            mb: 1,
          }}
        >
          No results
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ maxWidth: 300 }}
        >
          Please try again.
        </Typography>
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
