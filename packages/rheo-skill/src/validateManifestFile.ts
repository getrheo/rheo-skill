import { readFile } from 'node:fs/promises';
import { MANIFEST_SCHEMA_VERSION } from '@getrheo/contracts';
import type { ManifestValidationIssue } from '@getrheo/flow-runtime';
import { collectAnimationImportWarnings } from './collectAnimationImportWarnings.js';
import { collectBundleImportWarnings } from './collectBundleImportWarnings.js';
import { collectLocalizationImportWarnings } from './collectLocalizationImportWarnings.js';
import { collectPublishGateIssues } from './publishGates/collectPublishGateIssues.js';
import { fetchManifestProfile, type ManifestProfile } from './fetchManifestProfile.js';
import { summarizeManifest, type ManifestSummary } from './manifestSummary.js';

export type ValidateManifestFileResult =
  | {
      ok: true;
      manifestSchemaVersion: typeof MANIFEST_SCHEMA_VERSION;
      profile: ManifestProfile;
      summary: ManifestSummary;
      warnings: ManifestValidationIssue[];
    }
  | {
      ok: false;
      manifestSchemaVersion: typeof MANIFEST_SCHEMA_VERSION;
      profile: ManifestProfile;
      issues: ManifestValidationIssue[];
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

export const validateManifestFile = async (
  path: string,
  opts?: { offlineProfile?: boolean; profileUrl?: string },
): Promise<ValidateManifestFileResult> => {
  const [data, profile] = await Promise.all([
    parseJsonFile(path),
    fetchManifestProfile({ offline: opts?.offlineProfile, url: opts?.profileUrl }),
  ]);
  const gates = collectPublishGateIssues(data);

  if (gates.ok === false && gates.kind === 'invalid_schema') {
    return {
      ok: false,
      manifestSchemaVersion: MANIFEST_SCHEMA_VERSION,
      profile,
      issues: gates.issues.map((issue) => ({
        path: issue.path ?? [],
        message: issue.message,
        code: issue.code,
        stepId: issue.stepId ?? null,
      })),
    };
  }

  const schemaIssues: ManifestValidationIssue[] = gates.blocking.map((issue) => ({
    path: issue.path ?? [],
    message: issue.message,
    code: issue.code,
    stepId: issue.stepId ?? null,
  }));

  const bundleWarnings = await collectBundleImportWarnings(path);
  const warnings: ManifestValidationIssue[] = [
    ...gates.warnings.map((issue) => ({
      path: issue.path ?? [],
      message: issue.message,
      code: issue.code,
      stepId: issue.stepId ?? null,
    })),
    ...collectAnimationImportWarnings(gates.manifest),
    ...collectLocalizationImportWarnings(gates.manifest),
    ...bundleWarnings,
  ];

  return {
    ok: gates.ok,
    manifestSchemaVersion: MANIFEST_SCHEMA_VERSION,
    profile,
    summary: summarizeManifest(gates.manifest),
    warnings,
    ...(gates.ok ? {} : { issues: schemaIssues }),
  } as ValidateManifestFileResult;
};

export const formatIssues = (issues: ManifestValidationIssue[]): string =>
  issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
      return `- ${path}: ${issue.message} [${issue.code}]`;
    })
    .join('\n');
