import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import type { AuditFile } from './auditTypes.js';

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.swift']);
const TEXT_EXTENSIONS = new Set([
  '.css',
  '.json',
  '.js',
  '.jsx',
  '.mjs',
  '.swift',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
]);
const ASSET_EXTENSIONS = new Set([
  '.gif',
  '.jpeg',
  '.jpg',
  '.json',
  '.lottie',
  '.mov',
  '.mp4',
  '.otf',
  '.png',
  '.ttf',
  '.webm',
  '.webp',
  '.woff',
  '.woff2',
]);
const LOCALE_DIR_NAMES = ['locales', 'translations', 'i18n', 'lang', 'l10n'];
const LOCALE_FILE_RE = /^[a-z]{2}(?:-[A-Z]{2})?\.(?:json|ts|js)$/i;

const IMPORT_RE =
  /(?:import\s+[^'"]*from\s+|import\s+|export\s+[^'"]*from\s+|require\s*\(\s*)['"]([^'"]+)['"]/g;

const ROOT_CONFIG_FILES = [
  'package.json',
  'app.json',
  'tailwind.config.js',
  'tailwind.config.ts',
  'tailwind.config.mjs',
  'global.css',
  'nativewind-env.d.ts',
];

const extname = (path: string): string => {
  const match = path.match(/\.[^.]+$/);
  return match?.[0]?.toLowerCase() ?? '';
};

const isInterestingPath = (path: string): boolean => {
  const ext = extname(path);
  return TEXT_EXTENSIONS.has(ext) || ASSET_EXTENSIONS.has(ext);
};

export const readImports = (content: string): string[] => {
  const specs: string[] = [];
  let match = IMPORT_RE.exec(content);
  while (match) {
    const spec = match[1];
    if (spec) specs.push(spec);
    match = IMPORT_RE.exec(content);
  }
  IMPORT_RE.lastIndex = 0;
  return specs;
};

export const resolveImportToRelPath = (
  fromDir: string,
  root: string,
  spec: string,
): string | null => {
  if (!spec.startsWith('.')) return null;
  const base = resolve(fromDir, spec);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.swift`,
    join(base, 'index.ts'),
    join(base, 'index.tsx'),
    join(base, 'index.js'),
    join(base, 'index.swift'),
  ];
  for (const candidate of candidates) {
    if (!candidate.startsWith(root) || !existsSync(candidate)) continue;
    if (!statSync(candidate).isFile()) continue;
    return relative(root, candidate);
  }
  return null;
};

const toRelPath = (root: string, absolutePath: string): string =>
  relative(root, absolutePath).replace(/^\.\//, '');

export const isPathUnderRoot = (root: string, target: string): boolean => {
  const rel = relative(resolve(root), resolve(target));
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
};

const loadAuditFile = async (root: string, relPath: string): Promise<AuditFile | null> => {
  const absolutePath = resolve(root, relPath);
  if (!isPathUnderRoot(root, absolutePath)) return null;
  if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) return null;
  if (!isInterestingPath(relPath)) return null;
  const size = (await stat(absolutePath)).size;
  const isText = TEXT_EXTENSIONS.has(extname(relPath)) && size < 500_000;
  return {
    path: relPath,
    absolutePath,
    content: isText ? await readFile(absolutePath, 'utf8') : null,
  };
};

const collectSourceFilesUnderDir = async (
  root: string,
  dirRel: string,
  maxFiles: number,
): Promise<string[]> => {
  const results: string[] = [];
  const absDir = resolve(root, dirRel);

  const walk = async (dir: string): Promise<void> => {
    if (results.length >= maxFiles) return;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (results.length >= maxFiles) return;
      const absolutePath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        await walk(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      const rel = toRelPath(root, absolutePath);
      if (SOURCE_EXTENSIONS.has(extname(rel))) results.push(rel);
    }
  };

  if (existsSync(absDir) && statSync(absDir).isDirectory()) {
    await walk(absDir);
  }
  return results;
};

const ancestorDirs = (relPath: string): string[] => {
  const dirs: string[] = [];
  let current = dirname(relPath.replace(/^\.\//, ''));
  for (let depth = 0; depth < 5; depth += 1) {
    dirs.push(current === '.' ? '' : current);
    if (current === '.' || current === '') break;
    current = dirname(current);
  }
  return dirs;
};

const discoverLocaleFiles = async (root: string, seedPaths: Set<string>): Promise<string[]> => {
  const dirsToCheck = new Set<string>();
  for (const path of seedPaths) {
    for (const dir of ancestorDirs(path)) dirsToCheck.add(dir);
  }

  const localeFiles: string[] = [];
  for (const dir of dirsToCheck) {
    for (const localeDirName of LOCALE_DIR_NAMES) {
      const localeDir = dir
        ? resolve(root, dir, localeDirName)
        : resolve(root, localeDirName);
      if (!existsSync(localeDir) || !statSync(localeDir).isDirectory()) continue;
      const entries = await readdir(localeDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || !LOCALE_FILE_RE.test(entry.name)) continue;
        localeFiles.push(toRelPath(root, join(localeDir, entry.name)));
      }
    }
  }
  return localeFiles;
};

const discoverRootConfigFiles = (root: string): string[] =>
  ROOT_CONFIG_FILES.filter((name) => existsSync(resolve(root, name))).map((name) => name);

export type EntryCrawlOptions = {
  root: string;
  /** Paths relative to `root`, or absolute paths inside `root`. */
  entries: string[];
  maxFiles?: number;
};

export type EntryCrawlResult = {
  files: AuditFile[];
  /** Entry paths relative to root (normalized). */
  entries: string[];
  scopeMode: 'import-graph' | 'directory' | 'mixed';
};

/**
 * Build a minimal file set by crawling from one or more entry files/directories.
 * File entries follow relative import/require edges; directory entries include
 * source files in that subtree. Locale JSON and root config files are added
 * only when relevant — never the whole repo.
 */
export const crawlFromEntries = async (opts: EntryCrawlOptions): Promise<EntryCrawlResult> => {
  const root = resolve(opts.root);
  const maxFiles = opts.maxFiles ?? 600;
  const normalizedEntries = opts.entries.map((entry) =>
    entry.startsWith(root) ? toRelPath(root, entry) : entry.replace(/^\.\//, '').replace(/\/$/, ''),
  );

  const byPath = new Map<string, AuditFile>();
  const queue: string[] = [];
  const visited = new Set<string>();
  let scopeMode: EntryCrawlResult['scopeMode'] = 'import-graph';

  const enqueue = (relPath: string): void => {
    const normalized = relPath.replace(/^\.\//, '');
    if (visited.has(normalized) || visited.size >= maxFiles) return;
    visited.add(normalized);
    queue.push(normalized);
  };

  for (const entryRel of normalizedEntries) {
    const abs = resolve(root, entryRel);
    if (!isPathUnderRoot(root, abs) || !existsSync(abs)) continue;

    if (statSync(abs).isDirectory()) {
      scopeMode = scopeMode === 'import-graph' ? 'directory' : 'mixed';
      const underDir = await collectSourceFilesUnderDir(root, entryRel, maxFiles);
      underDir.forEach(enqueue);
      continue;
    }

    enqueue(entryRel);
  }

  while (queue.length > 0 && byPath.size < maxFiles) {
    const current = queue.shift();
    if (!current) continue;

    const file = byPath.get(current) ?? (await loadAuditFile(root, current));
    if (!file) continue;
    byPath.set(current, file);

    if (!file.content) continue;

    const dir = dirname(resolve(root, current));
    for (const spec of readImports(file.content)) {
      const rel = resolveImportToRelPath(dir, root, spec);
      if (rel) enqueue(rel);
    }
  }

  const seedPaths = new Set(byPath.keys());
  const localeFiles = await discoverLocaleFiles(root, seedPaths);
  for (const localePath of localeFiles) {
    if (byPath.size >= maxFiles) break;
    if (byPath.has(localePath)) continue;
    const file = await loadAuditFile(root, localePath);
    if (file) byPath.set(localePath, file);
  }

  for (const configPath of discoverRootConfigFiles(root)) {
    if (byPath.size >= maxFiles) break;
    if (byPath.has(configPath)) continue;
    const file = await loadAuditFile(root, configPath);
    if (file) byPath.set(configPath, file);
  }

  return {
    files: [...byPath.values()],
    entries: normalizedEntries,
    scopeMode,
  };
};
