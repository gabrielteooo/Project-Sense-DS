import type { DocBlock, DocBlockList } from '../types/docBlocks';
import { DOC_BLOCK_TYPES } from '../types/docBlocks';
import { isAllowlistedDemoId } from './interactiveDemoRegistry';

export type DocBlockValidationIssue = {
  path: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateBlock(block: unknown, index: number): DocBlockValidationIssue[] {
  const issues: DocBlockValidationIssue[] = [];
  const base = `blocks[${index}]`;

  if (!block || typeof block !== 'object') {
    return [{ path: base, message: 'Block must be an object.' }];
  }

  const record = block as Record<string, unknown>;
  const type = record.type;
  const id = record.id;

  if (!isNonEmptyString(id)) {
    issues.push({ path: `${base}.id`, message: 'Block id is required.' });
  } else if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(id)) {
    issues.push({
      path: `${base}.id`,
      message: 'Block id must be lowercase letters, numbers, and hyphens (max 64 chars).',
    });
  }

  if (typeof type !== 'string' || !DOC_BLOCK_TYPES.includes(type as DocBlock['type'])) {
    issues.push({ path: `${base}.type`, message: `Unknown block type "${String(type)}".` });
    return issues;
  }

  switch (type) {
    case 'richText': {
      if (!isNonEmptyString(record.body)) {
        issues.push({ path: `${base}.body`, message: 'Rich text body is required.' });
      }
      break;
    }
    case 'image': {
      if (!isNonEmptyString(record.src)) {
        issues.push({ path: `${base}.src`, message: 'Image path is required.' });
      }
      if (!isNonEmptyString(record.alt)) {
        issues.push({ path: `${base}.alt`, message: 'Alternative text is required for images.' });
      }
      break;
    }
    case 'table': {
      const columns = record.columns;
      if (!Array.isArray(columns) || columns.length === 0) {
        issues.push({ path: `${base}.columns`, message: 'Table needs at least one column heading.' });
        break;
      }
      if (!columns.every((c) => typeof c === 'string')) {
        issues.push({ path: `${base}.columns`, message: 'Column headings must be strings.' });
        break;
      }
      const colCount = columns.length;
      const rows = record.rows;
      if (!Array.isArray(rows)) {
        issues.push({ path: `${base}.rows`, message: 'Table rows must be an array.' });
        break;
      }
      rows.forEach((row, rowIndex) => {
        let cells: unknown[] | undefined;
        if (Array.isArray(row)) {
          cells = row;
        } else if (row && typeof row === 'object' && Array.isArray((row as { cells?: unknown }).cells)) {
          cells = (row as { cells: unknown[] }).cells;
        } else {
          issues.push({
            path: `${base}.rows[${rowIndex}]`,
            message: 'Each row must be a list of cells or an object with a cells array.',
          });
          return;
        }
        if (cells.length !== colCount) {
          issues.push({
            path: `${base}.rows[${rowIndex}]`,
            message: `Row has ${cells.length} cells but ${colCount} columns are defined.`,
          });
        }
        if (!cells.every((cell) => typeof cell === 'string')) {
          issues.push({
            path: `${base}.rows[${rowIndex}]`,
            message: 'All table cells must be strings.',
          });
        }
      });
      break;
    }
    case 'doDont': {
      const pairs = record.pairs;
      if (!Array.isArray(pairs) || pairs.length === 0) {
        issues.push({ path: `${base}.pairs`, message: 'Add at least one Do / Don’t pair.' });
        break;
      }
      pairs.forEach((pair, pairIndex) => {
        if (!pair || typeof pair !== 'object') {
          issues.push({ path: `${base}.pairs[${pairIndex}]`, message: 'Invalid pair.' });
          return;
        }
        const p = pair as Record<string, unknown>;
        if (!isNonEmptyString(p.do)) {
          issues.push({ path: `${base}.pairs[${pairIndex}].do`, message: '“Do” text is required.' });
        }
        if (!isNonEmptyString(p.dont)) {
          issues.push({
            path: `${base}.pairs[${pairIndex}].dont`,
            message: '“Don’t” text is required.',
          });
        }
      });
      break;
    }
    case 'callout': {
      const variant = record.variant;
      if (variant !== 'information' && variant !== 'warning') {
        issues.push({
          path: `${base}.variant`,
          message: 'Callout variant must be information or warning.',
        });
      }
      if (!isNonEmptyString(record.body)) {
        issues.push({ path: `${base}.body`, message: 'Callout body is required.' });
      }
      break;
    }
    case 'interactiveExample': {
      const demoId = record.demoId;
      if (!isNonEmptyString(demoId) || !isAllowlistedDemoId(demoId)) {
        issues.push({
          path: `${base}.demoId`,
          message: 'Choose a registered interactive demo from the allowlist.',
        });
      }
      break;
    }
    default:
      break;
  }

  return issues;
}

export function validateDocBlockList(blocks: unknown): DocBlockValidationIssue[] {
  if (!Array.isArray(blocks)) {
    return [{ path: 'blocks', message: 'blocks must be an array.' }];
  }

  const issues: DocBlockValidationIssue[] = [];
  const seenIds = new Set<string>();

  blocks.forEach((block, index) => {
    issues.push(...validateBlock(block, index));
    if (block && typeof block === 'object' && isNonEmptyString((block as DocBlock).id)) {
      const id = (block as DocBlock).id;
      if (seenIds.has(id)) {
        issues.push({ path: `blocks[${index}].id`, message: `Duplicate block id "${id}".` });
      }
      seenIds.add(id);
    }
  });

  return issues;
}

export function assertValidDocBlocks(blocks: DocBlockList, label: string): void {
  const issues = validateDocBlockList(blocks);
  if (issues.length === 0) return;
  const detail = issues.map((i) => `  ${i.path}: ${i.message}`).join('\n');
  throw new Error(`Invalid doc blocks (${label}):\n${detail}`);
}
