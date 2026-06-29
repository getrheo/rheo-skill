import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  collectPublishGateIssues,
  type CollectPublishGateOptions,
  type CollectPublishGateIssuesResult,
} from './collectPublishGateIssues.js';
import { renderPublishGateMarkdown } from './renderPublishGateMarkdown.js';

export type AuditManifestPublishOptions = CollectPublishGateOptions & {
  manifestPath: string;
  data: unknown;
  out?: string;
};

export type AuditManifestPublishResult = CollectPublishGateIssuesResult & {
  outPath?: string;
};

export const auditManifestPublish = (
  opts: AuditManifestPublishOptions,
): AuditManifestPublishResult => {
  const { manifestPath: _manifestPath, data, out, ...gateOpts } = opts;
  const result = collectPublishGateIssues(data, gateOpts);
  return { ...result, outPath: out };
};

export const auditManifestPublishToFile = async (
  opts: AuditManifestPublishOptions,
): Promise<AuditManifestPublishResult> => {
  const result = auditManifestPublish(opts);
  if (!opts.out) return result;

  const outPath = resolve(opts.out);
  const markdown = renderPublishGateMarkdown(opts.manifestPath, result);
  await writeFile(outPath, markdown, 'utf8');
  return { ...result, outPath };
};
