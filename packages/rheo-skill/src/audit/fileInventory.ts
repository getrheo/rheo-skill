import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { AuditFile } from './auditTypes.js';

const SKIP_DIRS = new Set([
  '.git',
  '.next',
  '.turbo',
  'build',
  'coverage',
  'dist',
  'node_modules',
  'Pods',
  '.expo',
]);

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

const INTERESTING_ASSET_EXTENSIONS = new Set([
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

const extname = (path: string): string => {
  const match = path.match(/\.[^.]+$/);
  return match?.[0]?.toLowerCase() ?? '';
};

const isInteresting = (path: string): boolean => {
  const ext = extname(path);
  return TEXT_EXTENSIONS.has(ext) || INTERESTING_ASSET_EXTENSIONS.has(ext);
};

export const buildFileInventory = async (
  root: string,
  opts?: { maxFiles?: number },
): Promise<AuditFile[]> => {
  const maxFiles = opts?.maxFiles ?? 600;
  const files: AuditFile[] = [];

  const walk = async (dir: string): Promise<void> => {
    if (files.length >= maxFiles) return;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (files.length >= maxFiles) return;
      const absolutePath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) await walk(absolutePath);
        continue;
      }
      if (!entry.isFile() || !isInteresting(entry.name)) continue;
      const rel = relative(root, absolutePath);
      const size = (await stat(absolutePath)).size;
      const isText = TEXT_EXTENSIONS.has(extname(entry.name)) && size < 500_000;
      files.push({
        path: rel,
        absolutePath,
        content: isText ? await readFile(absolutePath, 'utf8') : null,
      });
    }
  };

  await walk(root);
  return files;
};
