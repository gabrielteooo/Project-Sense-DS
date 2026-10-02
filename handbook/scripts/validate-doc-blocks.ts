import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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

const button = loadJson('content/components/button.json') as {
  usage?: { contentBlocks?: unknown };
};
const fixture = loadJson('content/fixtures/button-doc-blocks.fixture.json') as {
  blocks: unknown;
};

if (button.usage?.contentBlocks) {
  assertValid(button.usage.contentBlocks, 'button.json usage.contentBlocks');
}
assertValid(fixture.blocks, 'button-doc-blocks.fixture.json');

console.log('Component content validation passed.');
