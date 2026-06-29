import { existsSync, statSync } from 'node:fs';
import { dirname, join, parse, resolve } from 'node:path';

/** Files that mark the root of a host app/project we want to audit. */
const ROOT_MARKERS = [
  'package.json',
  'app.json',
  'app.config.js',
  'app.config.ts',
  'app.config.mjs',
  'Package.swift',
  'Podfile',
];

/**
 * Walk up from a file or directory to the nearest enclosing project root
 * (the closest ancestor that contains a known project marker). Returns
 * `undefined` when no marker is found before the filesystem root.
 */
export const inferProjectRoot = (fromPath: string): string | undefined => {
  const start = resolve(fromPath);
  let dir = existsSync(start) && statSync(start).isDirectory() ? start : dirname(start);
  const { root } = parse(dir);

  for (;;) {
    if (ROOT_MARKERS.some((marker) => existsSync(join(dir, marker)))) return dir;
    if (dir === root) return undefined;
    dir = dirname(dir);
  }
};

/**
 * True when a directory resolves inside the Rheo skill itself (e.g. an agent ran
 * the audit from the skill folder instead of the target app). Auditing this
 * scans the skill's own examples/references and produces only noise.
 */
export const looksLikeSkillRoot = (dir: string): boolean =>
  existsSync(resolve(dir, 'rheo/rheo-flow-import/scripts/lib/rheo-cli.mjs')) ||
  existsSync(resolve(dir, 'rheo-flow-import/scripts/lib/rheo-cli.mjs')) ||
  existsSync(resolve(dir, 'scripts/lib/rheo-cli.mjs'));
