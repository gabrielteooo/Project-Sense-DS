import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  normalizeComponentPageTabs,
  validateComponentPageTabs,
} from '../src/components/component-page-template/validateComponentPageTemplate';
import type { ComponentPageTabs } from '../src/types/componentPageTemplate';
import { validateDocBlockList } from '../src/doc-blocks/validateDocBlocks';

const handbookRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadJson(relativePath: string): unknown {
  const full = path.join(handbookRoot, relativePath);
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

function assertValid(blocks: unknown, label: string): void {
  const issues = validateDocBlockList(blocks);
  if (issues.length === 0) {
    console.log(`OK: ${label}`);
    return;
  }
  const detail = issues.map((i) => `  ${i.path}: ${i.message}`).join('\n');
  throw new Error(`Invalid doc blocks (${label}):\n${detail}`);
}

function assertTemplate(tabs: unknown, label: string): void {
  const issues = validateComponentPageTabs(tabs);
  if (issues.length === 0) {
    console.log(`OK: ${label}`);
    return;
  }
  const detail = issues.map((i) => `  ${i.path}: ${i.message}`).join('\n');
  throw new Error(`Invalid component page template (${label}):\n${detail}`);
}

const button = loadJson('content/components/button.json') as {
  pageFormatVersion?: number;
  tabs?: unknown;
  usage?: { cmsPilot?: { blocks?: unknown } };
};
const template = loadJson('content/components/_template.component.page.json') as {
  tabs?: unknown;
};
const fixture = loadJson('content/fixtures/button-cms-blocks.fixture.json') as {
  blocks: unknown;
};

function assertTemplateNormalized(tabs: unknown, label: string): void {
  if (!tabs || typeof tabs !== 'object') {
    assertTemplate(tabs, label);
    return;
  }
  const normalized = normalizeComponentPageTabs(tabs as ComponentPageTabs);
  assertTemplate(normalized, label);
}

if (button.pageFormatVersion === 2) {
  assertTemplateNormalized(button.tabs, 'button.json tabs');
}
assertTemplateNormalized(template.tabs, '_template.component.page.json tabs');

if (button.usage?.cmsPilot?.blocks) {
  assertValid(button.usage.cmsPilot.blocks, 'button.json usage.cmsPilot.blocks');
}
assertValid(fixture.blocks, 'button-cms-blocks.fixture.json');

console.log('Component content validation passed.');
