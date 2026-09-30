import type { DocBlock, DocTableBlock } from '../types/docBlocks';
import { validateDocBlockList } from './validateDocBlocks';

function normalizeTableRows(rows: unknown): string[][] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => {
    if (Array.isArray(row)) {
      return row.map((cell) => String(cell));
    }
    if (row && typeof row === 'object' && Array.isArray((row as { cells?: unknown }).cells)) {
      return (row as { cells: unknown[] }).cells.map((cell) => String(cell));
    }
    return [];
  });
}

function normalizeBlock(raw: DocBlock): DocBlock {
  if (raw.type !== 'table') return raw;
  const table = raw as DocTableBlock;
  return { ...table, rows: normalizeTableRows(table.rows) };
}

export type UsageCmsPilotContent = {
  sectionTitle: string;
  blocks: DocBlock[];
};

export function parseUsageCmsPilot(raw: unknown): UsageCmsPilotContent | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const record = raw as Record<string, unknown>;
  const sectionTitle =
    typeof record.sectionTitle === 'string' ? record.sectionTitle : 'Documentation';
  const blocks = record.blocks;
  if (!Array.isArray(blocks) || blocks.length === 0) return undefined;

  const issues = validateDocBlockList(blocks);
  if (issues.length > 0) {
    if (import.meta.env.DEV) {
      console.warn('[cmsPilot] Invalid doc blocks:', issues);
    }
    return undefined;
  }

  return {
    sectionTitle,
    blocks: (blocks as DocBlock[]).map(normalizeBlock),
  };
}
