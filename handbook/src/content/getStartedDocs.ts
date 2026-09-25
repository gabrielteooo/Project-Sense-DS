import errorHandling from '../../content/get-started/error-handling.json';

export type GetStartedDocContent = {
  pageTitle: string;
  pageDescription: string;
  introParagraphs: string[];
};

/** Slug → content for Get started sub-pages (sidebar, single level) */
export const GET_STARTED_DOCS: Record<string, GetStartedDocContent> = {
  'error-handling': errorHandling,
};

export function getStartedDocSlugs(): string[] {
  return Object.keys(GET_STARTED_DOCS);
}
