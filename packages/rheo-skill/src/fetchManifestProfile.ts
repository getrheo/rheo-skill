import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_PROFILE_URL =
  'https://docs.getrheo.io/docs/md/developer-guide/agent-manifest-profile';

export type ManifestProfileSource = 'remote' | 'fallback';

export type ManifestProfile = {
  content: string;
  source: ManifestProfileSource;
  version: string | null;
  url?: string;
};

const FALLBACK_FILENAME = 'manifest-agent-profile-fallback.md';

const currentDir = dirname(fileURLToPath(import.meta.url));

/**
 * Resolves the bundled fallback profile across both layouts:
 * - dev: this file lives in `src/`, fallback in `rheo/rheo-flow-import/references/`
 * - shipped: the bundle lives in `rheo/rheo-flow-import/scripts/lib/`, fallback two dirs up
 * An explicit `RHEO_FALLBACK_PROFILE_PATH` env override wins when set.
 */
const resolveFallbackProfilePath = (): string => {
  const override = process.env.RHEO_FALLBACK_PROFILE_PATH?.trim();
  if (override) return resolve(override);

  // shipped bundle: rheo/rheo-flow-import/scripts/lib/ -> rheo/rheo-flow-import/references/
  const shippedPath = resolve(currentDir, '../../references', FALLBACK_FILENAME);
  const candidates = [
    shippedPath,
    // dev (tsx src/): src/ -> rheo/rheo-flow-import/references/
    resolve(currentDir, '../rheo/rheo-flow-import/references', FALLBACK_FILENAME),
    // belt-and-suspenders sibling layouts
    resolve(currentDir, '../references', FALLBACK_FILENAME),
    resolve(currentDir, 'references', FALLBACK_FILENAME),
  ];
  return candidates.find((candidate) => existsSync(candidate)) ?? shippedPath;
};

export const extractManifestProfileVersion = (content: string): string | null => {
  const match =
    content.match(/^Profile version:\s*([^\n]+)$/im) ??
    content.match(/^profileVersion:\s*([^\n]+)$/im);
  return match?.[1]?.trim() ?? null;
};

export const readBundledManifestProfile = async (): Promise<ManifestProfile> => {
  const content = await readFile(resolveFallbackProfilePath(), 'utf8');
  return {
    content,
    source: 'fallback',
    version: extractManifestProfileVersion(content),
  };
};

export const fetchManifestProfile = async (opts?: {
  url?: string;
  offline?: boolean;
  timeoutMs?: number;
}): Promise<ManifestProfile> => {
  if (opts?.offline) return readBundledManifestProfile();

  const url =
    opts?.url ??
    process.env.RHEO_MANIFEST_PROFILE_URL?.trim() ??
    DEFAULT_PROFILE_URL;
  const timeoutMs = opts?.timeoutMs ?? 8_000;
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: 'text/markdown,text/plain;q=0.9,*/*;q=0.8' },
    });
    if (!res.ok) return readBundledManifestProfile();
    const content = await res.text();
    return {
      content,
      source: 'remote',
      version: extractManifestProfileVersion(content),
      url,
    };
  } catch {
    return readBundledManifestProfile();
  } finally {
    clearTimeout(timeout);
  }
};
