"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { DataContextType, SurveySeries, SurveyProject, ProjectStatus } from '@/lib/types';
import { seedData } from '@/lib/seed';
import { generateId, sortByTermTitle, sortByName } from '@/lib/utils';
import { filterProjects } from '@/lib/filters';
import { useUI } from '@/contexts/UIContext';

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
  const { showSpinner, hideSpinner } = useUI();
  const [series, setSeries] = useState<SurveySeries[]>(seedData);
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(seedData[0]?.id || null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | null>(null);
  const [seriesSearchTerm, setSeriesSearchTerm] = useState('');
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

  const filteredSeries = useMemo(() => {
    if (!seriesSearchTerm) return sortByName(series);
    const term = seriesSearchTerm.toLowerCase();
    return sortByName(series.filter(s => s.name.toLowerCase().includes(term)));
  }, [series, seriesSearchTerm]);

  const selectSeries = (seriesId: string) => {
    setSelectedSeriesId(seriesId);
    setSelectedProjectId(null);
  };

  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const addProject = async (seriesId: string, projectData: Omit<SurveyProject, 'id' | 'createdAt'>) => {
    showSpinner();
    try {
      await delay(500);
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

      setSelectedProjectId(newProject.id);
    } finally {
      hideSpinner();
    }
  };

  const updateProject = async (projectId: string, updates: Partial<SurveyProject>) => {
    showSpinner();
    try {
      await delay(400);
      setSeries(prev => prev.map(s => ({
        ...s,
        projects: s.projects.map(p => 
          p.id === projectId ? { ...p, ...updates } : p
        )
      })));
    } finally {
      hideSpinner();
    }
  };

  const deleteProject = async (projectId: string) => {
    showSpinner();
    try {
      await delay(500);
      let nextProjectId: string | null = null;
      
      setSeries(prev => prev.map(s => {
        const sortedProjects = sortByTermTitle(s.projects);
        const projectIndex = sortedProjects.findIndex(p => p.id === projectId);
        
        if (projectIndex !== -1) {
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

      setSelectedProjectId(nextProjectId);
    } finally {
      hideSpinner();
    }
  };

  const addSeries = async (name: string) => {
    showSpinner();
    try {
      await delay(400);
      const newSeries: SurveySeries = {
        id: generateId(),
        name,
        projects: [],
      };
      setSeries(prev => sortByName([...prev, newSeries]));
      setSelectedSeriesId(newSeries.id);
      setSelectedProjectId(null);
    } finally {
      hideSpinner();
    }
  };

  const deleteSeries = async (seriesId: string) => {
    showSpinner();
    try {
      await delay(400);
      setSeries(prev => prev.filter(s => s.id !== seriesId));
      if (selectedSeriesId === seriesId) {
        const remaining = series.filter(s => s.id !== seriesId);
        setSelectedSeriesId(remaining[0]?.id || null);
        setSelectedProjectId(null);
      }
    } finally {
      hideSpinner();
    }
  };

  const updateSeries = async (seriesId: string, name: string) => {
    showSpinner();
    try {
      await delay(300);
      setSeries(prev => sortByName(prev.map(s => s.id === seriesId ? { ...s, name } : s)));
    } finally {
      hideSpinner();
    }
  };

  const value: DataContextType = {
    series,
    selectedSeriesId,
    selectedProjectId,
    searchTerm,
    statusFilter,
    seriesSearchTerm,
    selectSeries,
    selectProject,
    setSearchTerm,
    setStatusFilter,
    setSeriesSearchTerm,
    addProject,
    updateProject,
    deleteProject,
    addSeries,
    deleteSeries,
    updateSeries,
    selectedSeries,
    selectedProject,
    filteredProjects,
    filteredSeries,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
