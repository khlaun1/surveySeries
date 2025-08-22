export function generateId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

export function sortByTermTitle<T extends { termTitle: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.termTitle.localeCompare(b.termTitle));
}

export function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}
