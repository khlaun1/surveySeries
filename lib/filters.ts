import { SurveyProject, ProjectStatus } from './types';

export function filterProjects(
  projects: SurveyProject[],
  searchTerm: string,
  statusFilter: ProjectStatus | null
): SurveyProject[] {
  return projects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.termTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.surveyTemplate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
}
