"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { DataContextType, SurveySeries, SurveyProject, ProjectStatus } from '@/lib/types';
import { seedData } from '@/lib/seed';
import { generateId, sortByTermTitle } from '@/lib/utils';
import { filterProjects } from '@/lib/filters';

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [series, setSeries] = useState<SurveySeries[]>(seedData);
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(seedData[0]?.id || null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | null>(null);

  // Computed values
  const selectedSeries = useMemo(() => 
    series.find(s => s.id === selectedSeriesId) || null,
    [series, selectedSeriesId]
  );

  const selectedProject = useMemo(() => {
    if (!selectedSeries || !selectedProjectId) return null;
    return selectedSeries.projects.find(p => p.id === selectedProjectId) || null;
  }, [selectedSeries, selectedProjectId]);

  const filteredProjects = useMemo(() => {
    if (!selectedSeries) return [];
    const filtered = filterProjects(selectedSeries.projects, searchTerm, statusFilter);
    return sortByTermTitle(filtered);
  }, [selectedSeries, searchTerm, statusFilter]);

  // Actions
  const selectSeries = (seriesId: string) => {
    setSelectedSeriesId(seriesId);
    setSelectedProjectId(null); // Clear project selection when switching series
  };

  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const addProject = async (seriesId: string, projectData: Omit<SurveyProject, 'id' | 'createdAt'>) => {
    const newProject: SurveyProject = {
      ...projectData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    setSeries(prev => prev.map(s => 
      s.id === seriesId 
        ? { ...s, projects: [...s.projects, newProject] }
        : s
    ));

    // Auto-select the new project
    setSelectedProjectId(newProject.id);
  };

  const updateProject = async (projectId: string, updates: Partial<SurveyProject>) => {
    setSeries(prev => prev.map(s => ({
      ...s,
      projects: s.projects.map(p => 
        p.id === projectId ? { ...p, ...updates } : p
      )
    })));
  };

  const deleteProject = async (projectId: string) => {
    // Find the project to delete and get the next one in sorted order
    let nextProjectId: string | null = null;
    
    setSeries(prev => prev.map(s => {
      const sortedProjects = sortByTermTitle(s.projects);
      const projectIndex = sortedProjects.findIndex(p => p.id === projectId);
      
      if (projectIndex !== -1) {
        // Get next project for auto-selection
        if (projectIndex < sortedProjects.length - 1) {
          nextProjectId = sortedProjects[projectIndex + 1].id;
        } else if (projectIndex > 0) {
          nextProjectId = sortedProjects[projectIndex - 1].id;
        }
        
        return {
          ...s,
          projects: s.projects.filter(p => p.id !== projectId)
        };
      }
      return s;
    }));

    // Auto-select next project
    setSelectedProjectId(nextProjectId);
  };

  const value: DataContextType = {
    series,
    selectedSeriesId,
    selectedProjectId,
    searchTerm,
    statusFilter,
    selectSeries,
    selectProject,
    setSearchTerm,
    setStatusFilter,
    addProject,
    updateProject,
    deleteProject,
    selectedSeries,
    selectedProject,
    filteredProjects,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
