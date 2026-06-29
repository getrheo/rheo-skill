import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { FONT_FILE_EXTENSIONS } from '@getrheo/contracts/constants';
import type { ManifestValidationIssue } from '@getrheo/flow-runtime';

const FONT_EXT_SET = new Set<string>(FONT_FILE_EXTENSIONS);

const isFontPath = (path: string): boolean => {
  const lower = path.toLowerCase();
  return [...FONT_EXT_SET].some((ext) => lower.endsWith(ext));
};

type AssetsBundle = {
  assets?: Array<{ path?: string; type?: string; contentType?: string }>;
};

const readOptionalJson = async (path: string): Promise<unknown | null> => {
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
};

/** Warn when rheo-import.assets.json lists font files (must use rheo-import.fonts.json). */
export const collectBundleImportWarnings = async (
  manifestPath: string,
): Promise<ManifestValidationIssue[]> => {
  const dir = dirname(manifestPath);
  const assetsPath = join(dir, 'rheo-import.assets.json');
  const data = await readOptionalJson(assetsPath);
  if (!data || typeof data !== 'object') return [];

  const bundle = data as AssetsBundle;
  if (!Array.isArray(bundle.assets)) return [];

  const issues: ManifestValidationIssue[] = [];
  bundle.assets.forEach((row, index) => {
    const path = row.path?.trim();
    if (!path || !isFontPath(path)) return;
    const declared = row.type ? ` declares type "${row.type}"` : '';
    issues.push({
      path: ['assets', String(index), 'path'],
      message: `Font file "${path}" must not be in rheo-import.assets.json${declared}. Remove this row and add the file to rheo-import.fonts.json under fontFamilies[].styles (see font-import.md). Allowed assets.json types: image, lottie, video only.`,
      code: 'bundle_font_in_assets_json',
      stepId: null,
    });
  });

  return issues;
};
