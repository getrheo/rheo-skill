import { writeFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import type { AuditFile, AuditOptions, AuditReport } from './auditTypes.js';
import { buildFileInventory } from './fileInventory.js';
import { crawlFromEntries } from './entryCrawl.js';
import { analyzeAssets } from './analyzers/assetAnalyzer.js';
import { analyzeBackgrounds } from './analyzers/backgroundAnalyzer.js';
import { analyzeCarousels } from './analyzers/carouselAnalyzer.js';
import { analyzeAnimations, buildAnimationSuggestionsJson } from './analyzers/animationAnalyzer.js';
import { analyzeChoiceStates } from './analyzers/choiceStateAnalyzer.js';
import { analyzeFonts } from './analyzers/fontAnalyzer.js';
import { analyzeI18n } from './analyzers/i18nAnalyzer.js';
import { analyzeLayout } from './analyzers/layoutAnalyzer.js';
import { analyzeRegions } from './analyzers/regionAnalyzer.js';
import { detectStack } from './analyzers/stackDetector.js';
import { analyzeStyleTokens } from './analyzers/styleTokenAnalyzer.js';
import { buildMandatoryIntakeFindings } from './intakeQuestionnaire.js';
import { renderAuditMarkdown } from './renderAuditMarkdown.js';

const normalizeEntryList = (opts: Partial<AuditOptions>, root: string): string[] => {
  const raw = opts.entries?.length
    ? opts.entries
    : opts.entry
      ? [opts.entry]
      : [];
  return raw.map((entry) =>
    entry.startsWith(root) ? relative(root, entry) : entry.replace(/^\.\//, ''),
  );
};

const buildAuditFiles = async (
  root: string,
  entries: string[],
  maxFiles?: number,
): Promise<{ files: AuditFile[]; inventoryFiles: number; scopeMode?: AuditReport['scopeMode'] }> => {
  if (entries.length > 0) {
    const crawled = await crawlFromEntries({ root, entries, maxFiles });
    return {
      files: crawled.files,
      inventoryFiles: crawled.files.length,
      scopeMode: crawled.scopeMode,
    };
  }

  const inventory = await buildFileInventory(root, { maxFiles });
  return { files: inventory, inventoryFiles: inventory.length, scopeMode: 'full-root' };
};

export const auditImport = async (opts: Partial<AuditOptions>): Promise<AuditReport> => {
  const root = resolve(opts.root ?? process.cwd());
  const entries = normalizeEntryList(opts, root);
  const entryLabel = entries.length > 0 ? entries.join(', ') : undefined;
  const { files, inventoryFiles, scopeMode } = await buildAuditFiles(root, entries, opts.maxFiles);
  const findings = [
    ...buildMandatoryIntakeFindings({ entry: entryLabel, screenshots: opts.screenshots }),
    ...detectStack(files),
    ...analyzeRegions(files),
    ...analyzeStyleTokens(files),
    ...analyzeBackgrounds(files),
    ...analyzeCarousels(files),
    ...analyzeLayout(files),
    ...analyzeFonts(files),
    ...analyzeI18n(files),
    ...analyzeChoiceStates(files),
    ...analyzeAssets(files),
  ];
  const animation = analyzeAnimations(files);

  return {
    root,
    entry: entryLabel,
    entries: entries.length > 0 ? entries : undefined,
    screenshots: opts.screenshots,
    scannedFiles: files.length,
    inventoryFiles,
    scopeMode,
    findings: [...findings, ...animation.findings],
    animationSuggestions: animation.suggestions,
  };
};

export const auditImportToMarkdownFile = async (
  opts: Partial<AuditOptions>,
): Promise<{ report: AuditReport; markdown: string; outPath: string }> => {
  const reportRoot = resolve(opts.root ?? process.cwd());
  const report = await auditImport({ ...opts, root: reportRoot });
  const markdown = renderAuditMarkdown(report);
  const outPath = opts.out
    ? isAbsolute(opts.out)
      ? opts.out
      : resolve(reportRoot, opts.out)
    : resolve(process.cwd(), 'rheo-import.audit.md');
  await writeFile(outPath, markdown);

  if (opts.suggestAnimations && report.animationSuggestions?.length) {
    const suggestPath = isAbsolute(opts.suggestAnimations)
      ? opts.suggestAnimations
      : resolve(reportRoot, opts.suggestAnimations);
    const payload = buildAnimationSuggestionsJson(report.animationSuggestions);
    await writeFile(suggestPath, `${JSON.stringify(payload, null, 2)}\n`);
  }

  return { report, markdown, outPath };
};
