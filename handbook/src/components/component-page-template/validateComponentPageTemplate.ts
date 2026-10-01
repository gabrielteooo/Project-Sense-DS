import type { ComponentPageTabs } from '../../types/componentPageTemplate';

export type TemplateValidationIssue = { path: string; message: string };

function pushImageIssues(
  issues: TemplateValidationIssue[],
  path: string,
  image: unknown,
): void {
  if (!image || typeof image !== 'object') {
    issues.push({ path, message: 'Image object is required.' });
    return;
  }
  const alt = (image as { alt?: unknown }).alt;
  if (typeof alt !== 'string' || !alt.trim()) {
    issues.push({ path: `${path}.alt`, message: 'Alternative text is required.' });
  }
}

function validateFigureSections(
  issues: TemplateValidationIssue[],
  path: string,
  sections: unknown,
): void {
  if (sections === undefined || sections === null) {
    return;
  }
  if (!Array.isArray(sections)) {
    issues.push({ path, message: 'sections must be an array.' });
    return;
  }
  const seen = new Set<string>();
  sections.forEach((section, index) => {
    const base = `${path}[${index}]`;
    if (!section || typeof section !== 'object') {
      issues.push({ path: base, message: 'Section must be an object.' });
      return;
    }
    const s = section as Record<string, unknown>;
    if (typeof s.id !== 'string' || !s.id.trim()) {
      issues.push({ path: `${base}.id`, message: 'Section id is required.' });
    } else if (seen.has(s.id)) {
      issues.push({ path: `${base}.id`, message: `Duplicate section id "${s.id}".` });
    } else {
      seen.add(s.id);
    }
    if (typeof s.title !== 'string' || !s.title.trim()) {
      issues.push({ path: `${base}.title`, message: 'Section title is required.' });
    }
    pushImageIssues(issues, `${base}.image`, s.image);
  });
}

function normalizeRows(rows: unknown): string[][] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => {
    if (Array.isArray(row)) return row.map(String);
    if (row && typeof row === 'object' && Array.isArray((row as { cells?: unknown }).cells)) {
      return (row as { cells: unknown[] }).cells.map(String);
    }
    return [];
  });
}

export function validateComponentPageTabs(tabs: unknown): TemplateValidationIssue[] {
  const issues: TemplateValidationIssue[] = [];
  if (!tabs || typeof tabs !== 'object') {
    return [{ path: 'tabs', message: 'tabs object is required for pageFormatVersion 2.' }];
  }
  const t = tabs as ComponentPageTabs & Record<string, unknown>;

  pushImageIssues(issues, 'tabs.design.anatomyImage', t.design?.anatomyImage);
  pushImageIssues(issues, 'tabs.design.specificationGuidelinesImage', t.design?.specificationGuidelinesImage);
  validateFigureSections(issues, 'tabs.design.sections', t.design?.sections);

  if (typeof t.usage?.guidelineRichText !== 'string') {
    issues.push({ path: 'tabs.usage.guidelineRichText', message: 'Guideline rich text is required.' });
  }
  if (typeof t.usage?.usageRichText !== 'string') {
    issues.push({ path: 'tabs.usage.usageRichText', message: 'Usage rich text is required.' });
  }
  validateFigureSections(issues, 'tabs.usage.sections', t.usage?.sections);

  const columns = t.updates?.changelog?.columns;
  const rows = normalizeRows(t.updates?.changelog?.rows);
  if (!Array.isArray(columns) || columns.length === 0) {
    issues.push({ path: 'tabs.updates.changelog.columns', message: 'Changelog columns are required.' });
  } else if (Array.isArray(t.updates?.changelog?.rows)) {
    rows.forEach((row, rowIndex) => {
      if (row.length !== columns.length) {
        issues.push({
          path: `tabs.updates.changelog.rows[${rowIndex}]`,
          message: `Row has ${row.length} cells but ${columns.length} columns are defined.`,
        });
      }
    });
  }
  if (typeof t.updates?.roadmapRichText !== 'string') {
    issues.push({ path: 'tabs.updates.roadmapRichText', message: 'Roadmap rich text is required.' });
  }

  return issues;
}

function normalizeSections(sections: unknown): ComponentPageTabs['design']['sections'] {
  if (!Array.isArray(sections)) return [];
  return sections as ComponentPageTabs['design']['sections'];
}

/** Coerce partial Pages CMS merges (missing empty lists) into a complete template shape. */
export function normalizeComponentPageTabs(tabs: ComponentPageTabs): ComponentPageTabs {
  return {
    design: {
      ...tabs.design,
      sections: normalizeSections(tabs.design?.sections),
    },
    usage: {
      ...tabs.usage,
      sections: normalizeSections(tabs.usage?.sections),
    },
    updates: {
      ...tabs.updates,
      changelog: {
        ...tabs.updates.changelog,
        rows: normalizeRows(tabs.updates.changelog?.rows),
        columns: Array.isArray(tabs.updates.changelog?.columns)
          ? tabs.updates.changelog.columns
          : ['Date', 'Version', 'Description'],
      },
      roadmapRichText:
        typeof tabs.updates?.roadmapRichText === 'string' ? tabs.updates.roadmapRichText : '',
    },
  };
}

export function normalizeChangelogRows(tabs: ComponentPageTabs): ComponentPageTabs {
  return normalizeComponentPageTabs(tabs);
}
