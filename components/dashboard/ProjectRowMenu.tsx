"use client";

import { useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider
} from '@mui/material';
import { 
  MoreVert, 
  Edit, 
  Delete, 
  ChangeCircle 
} from '@mui/icons-material';
import { SurveyProject, STATUS_TRANSITIONS } from '@/lib/types';
import { canEditProject } from '@/lib/validations';

interface ProjectRowMenuProps {
  project: SurveyProject;
  onEdit: (project: SurveyProject) => void;
  onDelete: (project: SurveyProject) => void;
  onChangeStatus: (project: SurveyProject, newStatus: string) => void;
}

export default function ProjectRowMenu({ 
  project, 
  onEdit, 
  onDelete, 
  onChangeStatus 
}: ProjectRowMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const statusMenuOpen = Boolean(statusMenuAnchor);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent row selection
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setStatusMenuAnchor(null);
  };

  const handleEdit = () => {
    onEdit(project);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(project);
    handleClose();
  };

  const handleStatusMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleStatusChange = (newStatus: string) => {
    onChangeStatus(project, newStatus);
    handleClose();
  };

  const availableTransitions = STATUS_TRANSITIONS[project.status] || [];
  const canEdit = canEditProject(project.status);

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-label="More actions"
      >
        <MoreVert />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit} disabled={!canEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        
        {availableTransitions.length > 0 && (
          <MenuItem onClick={handleStatusMenuClick}>
            <ListItemIcon>
              <ChangeCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>Change Status</ListItemText>
          </MenuItem>
        )}
        
        <Divider />
        
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Status change submenu */}
      <Menu
        anchorEl={statusMenuAnchor}
        open={statusMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {availableTransitions.map((status) => (
          <MenuItem 
            key={status} 
            onClick={() => handleStatusChange(status)}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
