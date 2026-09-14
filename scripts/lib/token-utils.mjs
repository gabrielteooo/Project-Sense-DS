import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '../..');

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export function writeText(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text, 'utf8');
}

/** @param {unknown} obj */
export function isRef(val) {
  return typeof val === 'string' && val.startsWith('{') && val.endsWith('}');
}

/** @param {string} refStr e.g. "{Colors.Brand.Primary.colorPrimary}" */
export function refToParts(refStr) {
  return refStr.slice(1, -1).split('.');
}

/** @param {Record<string, unknown>} root */
export function getByPath(root, parts) {
  let node = root;
  for (const p of parts) {
    if (node == null || typeof node !== 'object' || !(p in node)) return undefined;
    node = /** @type {Record<string, unknown>} */ (node)[p];
  }
  return node;
}

/**
 * @param {unknown} val
 * @param {Record<string, unknown>} root
 * @param {Set<string>} stack
 */
export function resolveValue(val, root, stack = new Set()) {
  if (!isRef(val)) return val;

  const key = val;
  if (stack.has(key)) {
    throw new Error(`Circular alias: ${[...stack, key].join(' -> ')}`);
  }
  stack.add(key);

  const parts = refToParts(val);
  const node = getByPath(root, parts);
  if (node == null) {
    throw new Error(`Unresolved alias ${val}`);
  }
  if (typeof node === 'object' && node !== null && '$value' in node) {
    return resolveValue(/** @type {{ $value: unknown }} */ (node).$value, root, stack);
  }
  return resolveValue(node, root, stack);
}

/** @param {unknown} obj @param {string[]} pathParts */
export function* walkW3C(obj, pathParts = []) {
  if (obj == null || typeof obj !== 'object') return;
  const record = /** @type {Record<string, unknown>} */ (obj);
  if ('$type' in record && '$value' in record) {
    yield { path: pathParts, token: record };
    return;
  }
  for (const [key, child] of Object.entries(record)) {
    if (key.startsWith('$')) continue;
    yield* walkW3C(child, [...pathParts, key]);
  }
}

/** @param {string[]} pathParts */
export function pathToKebab(pathParts) {
  return pathParts
    .join('-')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/-+/g, '-');
}

/** @param {string[]} pathParts */
export function pathToCssVar(pathParts, prefix = 'ps') {
  return `--${prefix}-${pathToKebab(pathParts)}`;
}

/** @param {unknown} val */
export function colorToHex(val) {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object' && 'hex' in val) {
    return /** @type {{ hex: string }} */ (val).hex;
  }
  return val;
}

/** @param {unknown} val */
export function cssValue(val, root, stack) {
  const resolved = resolveValue(val, root, stack);
  if (resolved && typeof resolved === 'object' && 'hex' in resolved) {
    return /** @type {{ hex: string }} */ (resolved).hex;
  }
  if (typeof resolved === 'number') return `${resolved}px`;
  if (typeof resolved === 'string') return resolved;
  return resolved;
}

/** @param {unknown} tree @param {Record<string, unknown>} root */
export function deepResolveW3C(tree, root) {
  if (tree == null || typeof tree !== 'object') return tree;
  const record = /** @type {Record<string, unknown>} */ (tree);
  if ('$type' in record && '$value' in record) {
    const t = /** @type {{ $type: string; $value: unknown; $extensions?: unknown }} */ (record);
    return {
      $type: t.$type,
      $value: resolveValue(t.$value, root),
      ...(t.$extensions ? { $extensions: t.$extensions } : {}),
    };
  }
  const out = {};
  for (const [key, child] of Object.entries(record)) {
    if (key.startsWith('$')) {
      out[key] = child;
      continue;
    }
    out[key] = deepResolveW3C(child, root);
  }
  return out;
}

/** @param {string} name */
export function componentFileName(name) {
  return `${pathToKebab([name])}.json`;
}
