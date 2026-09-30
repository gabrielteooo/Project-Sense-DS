/** CMS-authored documentation blocks (Pages CMS pilot). */

export type DocRichTextFormat = 'markdown' | 'html';

export type DocBlockBase = {
  id: string;
  title?: string;
};

export type DocRichTextBlock = DocBlockBase & {
  type: 'richText';
  body: string;
  format?: DocRichTextFormat;
};

export type DocImageBlock = DocBlockBase & {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
};

export type DocTableBlock = DocBlockBase & {
  type: 'table';
  columns: string[];
  rows: string[][];
};

export type DocDoDontBlock = DocBlockBase & {
  type: 'doDont';
  pairs: { do: string; dont: string }[];
};

export type DocCalloutVariant = 'information' | 'warning';

export type DocCalloutBlock = DocBlockBase & {
  type: 'callout';
  variant: DocCalloutVariant;
  body: string;
  format?: DocRichTextFormat;
};

export type DocInteractiveExampleBlock = DocBlockBase & {
  type: 'interactiveExample';
  demoId: string;
};

export type DocBlock =
  | DocRichTextBlock
  | DocImageBlock
  | DocTableBlock
  | DocDoDontBlock
  | DocCalloutBlock
  | DocInteractiveExampleBlock;

export type DocBlockList = DocBlock[];

export type UsageCmsPilotSection = {
  sectionTitle: string;
  blocks: DocBlockList;
};

export const DOC_BLOCK_TYPES = [
  'richText',
  'image',
  'table',
  'doDont',
  'callout',
  'interactiveExample',
] as const;

export type DocBlockType = (typeof DOC_BLOCK_TYPES)[number];
