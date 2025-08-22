"use client";

import { useState } from 'react';
import { Stack, Divider } from "@mui/material";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectToolbar from "@/components/dashboard/ProjectToolbar";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import ProjectDetails from "@/components/dashboard/ProjectDetails";
import AddEditProjectDialog from "@/components/modals/AddEditProjectDialog";
import ConfirmDialog from "@/components/modals/ConfirmDialog";
import { useData } from "@/contexts/DataContext";
import { useUI } from "@/contexts/UIContext";
import { SurveyProject } from "@/lib/types";

export default function DashboardPage() {
  const { selectedSeriesId, addProject, updateProject, deleteProject } = useData();
  const { showSpinner, hideSpinner, enqueueToast } = useUI();
  
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<SurveyProject | null>(null);

  const handleAddTerm = () => {
    setAddDialogOpen(true);
  };

  const handleEditProject = (project: SurveyProject) => {
    setSelectedProject(project);
    setEditDialogOpen(true);
  };

  const handleDeleteProject = (project: SurveyProject) => {
    setSelectedProject(project);
    setDeleteDialogOpen(true);
  };

  const handleChangeStatus = async (project: SurveyProject, newStatus: string) => {
    try {
      showSpinner();
      await updateProject(project.id, { status: newStatus as any });
      enqueueToast(`Project status changed to ${newStatus}`, 'success');
    } catch (error) {
      enqueueToast('Failed to update project status', 'error');
    } finally {
      hideSpinner();
    }
  };

  const handleSaveProject = async (projectData: Omit<SurveyProject, 'id' | 'createdAt'>) => {
    if (!selectedSeriesId) return;

    try {
      showSpinner();
      
      if (editDialogOpen && selectedProject) {
        await updateProject(selectedProject.id, projectData);
        enqueueToast('Project updated successfully', 'success');
      } else {
        await addProject(selectedSeriesId, projectData);
        enqueueToast('Project created successfully', 'success');
      }
    } catch (error) {
      enqueueToast('Failed to save project', 'error');
    } finally {
      hideSpinner();
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProject) return;

    try {
      showSpinner();
      await deleteProject(selectedProject.id);
      enqueueToast('Project deleted successfully', 'success');
    } catch (error) {
      enqueueToast('Failed to delete project', 'error');
    } finally {
      hideSpinner();
    }
  };

  const handleCloseDialogs = () => {
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <Stack spacing={3}>
      <DashboardHeader onAddTerm={handleAddTerm} />
      
      <ProjectToolbar />
      
      <ProjectsTable
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
        onChangeStatus={handleChangeStatus}
      />
      
      <Divider />
      
      <ProjectDetails />

      {/* Add Project Dialog */}
      <AddEditProjectDialog
        open={addDialogOpen}
        onClose={handleCloseDialogs}
        onSave={handleSaveProject}
        mode="add"
      />

      {/* Edit Project Dialog */}
      <AddEditProjectDialog
        open={editDialogOpen}
        onClose={handleCloseDialogs}
        onSave={handleSaveProject}
        project={selectedProject}
        mode="edit"
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleCloseDialogs}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.termTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="error"
      />
    </Stack>
  );
}
