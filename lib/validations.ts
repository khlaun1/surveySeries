import { ProjectStatus } from './types';

export function canEditField(
  status: ProjectStatus, 
  field: "termTitle" | "surveyTemplate" | "courseSections" | "enrollments"
): boolean {
  if (status === "Closed") return false;
  
  if (status === "Live") {
    if (field === "termTitle" || field === "surveyTemplate" || field === "courseSections") {
      return false;
    }
  }
  
  if (status === "Published") {
    if (field === "termTitle" || field === "surveyTemplate") {
      return false;
    }
  }
  
  return true;
}

export function canEditProject(status: ProjectStatus): boolean {
  return status !== "Closed";
}

export function getEditableFields(status: ProjectStatus): string[] {
  const fields = ["termTitle", "surveyTemplate", "courseSections", "enrollments"];
  return fields.filter(field => canEditField(status, field as any));
}
