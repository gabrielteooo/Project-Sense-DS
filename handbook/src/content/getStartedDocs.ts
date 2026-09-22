import dataPersistence from '../../content/get-started/data-persistence.json';
import enhancementBacklog from '../../content/get-started/enhancement-backlog.json';
import errorHandling from '../../content/get-started/error-handling.json';

export type GetStartedDocContent = {
  pageTitle: string;
  pageDescription: string;
  introParagraphs: string[];
};

/** Slug → content for Get started sub-pages (sidebar, single level) */
export const GET_STARTED_DOCS: Record<string, GetStartedDocContent> = {
  'enhancement-backlog': enhancementBacklog,
  'data-persistence': dataPersistence,
  'error-handling': errorHandling,
};

export function getStartedDocSlugs(): string[] {
  return Object.keys(GET_STARTED_DOCS);
}
