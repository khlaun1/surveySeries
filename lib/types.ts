export type ProjectStatus = "Draft" | "Published" | "Live" | "Closed";

export interface SurveyProject {
  id: string;
  termTitle: string;
  courseSections: number;   // default 0
  enrollments: number;      // default 0
  surveyTemplate: string;   // hardcoded string
  createdAt: string;        // ISO
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

// UI Context types
export interface UIContextType {
  isLoading: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
  enqueueToast: (message: string, variant?: 'success' | 'error' | 'warning' | 'info') => void;
  toasts?: Array<{ id: string; message: string; variant: 'success' | 'error' | 'warning' | 'info' }>;
  dismissToast?: (id: string) => void;
}

// Data Context types
export interface DataContextType {
  series: SurveySeries[];
  selectedSeriesId: string | null;
  selectedProjectId: string | null;
  searchTerm: string;
  statusFilter: ProjectStatus | null;
  
  // Actions
  selectSeries: (seriesId: string) => void;
  selectProject: (projectId: string) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: ProjectStatus | null) => void;
  
  // CRUD
  addProject: (seriesId: string, project: Omit<SurveyProject, 'id' | 'createdAt'>) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<SurveyProject>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  
  // Computed
  selectedSeries: SurveySeries | null;
  selectedProject: SurveyProject | null;
  filteredProjects: SurveyProject[];
}
