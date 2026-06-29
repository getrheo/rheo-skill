import { readFile, writeFile } from 'node:fs/promises';
import { migrateLegacyManifest } from '@getrheo/contracts';
import {
  normalizeManifestLayoutInPlace,
  validateManifest,
  type ManifestValidationIssue,
} from '@getrheo/flow-runtime';

type ManifestLike = {
  flowId?: unknown;
  decisionNodes?: unknown;
  externalSurfaceNodes?: unknown;
  sdkAttributeKeys?: unknown;
};

export type NormalizeManifestResult = {
  manifest: unknown;
  changed: boolean;
  valid: boolean;
  issues?: ManifestValidationIssue[];
};

const parseJsonFile = async (path: string): Promise<unknown> => {
  const raw = await readFile(path, 'utf8');
  try {
    return JSON.parse(raw) as unknown;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON';
    throw new Error(`Could not parse ${path}: ${message}`, { cause: err });
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const normalizeManifestObject = (
  data: unknown,
  opts?: { targetFlowId?: string },
): NormalizeManifestResult => {
  const migrated = migrateLegacyManifest(data);
  const normalized = isRecord(migrated) ? { ...migrated } : migrated;
  let changed = JSON.stringify(migrated) !== JSON.stringify(data);

  if (isRecord(normalized)) {
    const m = normalized as ManifestLike;
    if (!Array.isArray(m.decisionNodes)) {
      normalized.decisionNodes = [];
      changed = true;
    }
    if (!Array.isArray(m.externalSurfaceNodes)) {
      normalized.externalSurfaceNodes = [];
      changed = true;
    }
    if (!Array.isArray(m.sdkAttributeKeys)) {
      normalized.sdkAttributeKeys = [];
      changed = true;
    }
    if (opts?.targetFlowId && normalized.flowId !== opts.targetFlowId) {
      normalized.flowId = opts.targetFlowId;
      changed = true;
    }
  }

  const validated = validateManifest(normalized);
  if (!validated.ok) {
    return {
      manifest: normalized,
      changed,
      valid: false,
      issues: validated.issues,
    };
  }

  const before = JSON.stringify(validated.manifest);
  normalizeManifestLayoutInPlace(validated.manifest);
  if (JSON.stringify(validated.manifest) !== before) changed = true;

  return {
    manifest: validated.manifest,
    changed,
    valid: true,
  };
};

export const normalizeManifestFile = async (
  path: string,
  opts?: { targetFlowId?: string; outPath?: string; write?: boolean },
): Promise<NormalizeManifestResult> => {
  const data = await parseJsonFile(path);
  const result = normalizeManifestObject(data, { targetFlowId: opts?.targetFlowId });
  const output = `${JSON.stringify(result.manifest, null, 2)}\n`;

  if (opts?.write) {
    await writeFile(path, output);
  } else if (opts?.outPath) {
    await writeFile(opts.outPath, output);
  }

  return result;
};
