export type ProjectStatus = "Draft" | "Published" | "Live" | "Closed";

export interface SurveyProject {
  id: string;
  termTitle: string;
  courseSections: number;
  enrollments: number;
  surveyTemplate: string;
  createdAt: string;
  status: ProjectStatus;
}

export interface SurveySeries {
  id: string;
  name: string;
  projects: SurveyProject[];
}

export const STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  Draft: ["Published", "Live", "Closed"],
  Published: ["Live", "Closed"],
  Live: ["Closed"],
  Closed: [],
};

export interface UIContextType {
  isLoading: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
  enqueueToast: (message: string, variant?: 'success' | 'error' | 'warning' | 'info') => void;
  toasts?: Array<{ id: string; message: string; variant: 'success' | 'error' | 'warning' | 'info' }>;
  dismissToast?: (id: string) => void;
}

export interface DataContextType {
  series: SurveySeries[];
  selectedSeriesId: string | null;
  selectedProjectId: string | null;
  searchTerm: string;
  statusFilter: ProjectStatus | null;
  seriesSearchTerm: string;
  
  selectSeries: (seriesId: string) => void;
  selectProject: (projectId: string) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: ProjectStatus | null) => void;
  setSeriesSearchTerm: (term: string) => void;
  
  addProject: (seriesId: string, project: Omit<SurveyProject, 'id' | 'createdAt'>) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<SurveyProject>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  addSeries: (name: string) => Promise<void>;
  deleteSeries: (seriesId: string) => Promise<void>;
  updateSeries: (seriesId: string, name: string) => Promise<void>;
  
  selectedSeries: SurveySeries | null;
  selectedProject: SurveyProject | null;
  filteredProjects: SurveyProject[];
  filteredSeries: SurveySeries[];
}
