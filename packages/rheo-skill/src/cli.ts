import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { isAbsolute, resolve } from 'node:path';
import { validateManifest } from '@getrheo/flow-runtime';
import { inferProjectRoot, looksLikeSkillRoot } from './audit/projectRoot.js';
import { formatIssues, validateManifestFile } from './validateManifestFile.js';
import { normalizeManifestFile } from './normalizeManifestFile.js';
import { fetchManifestProfile } from './fetchManifestProfile.js';
import { summarizeManifest } from './manifestSummary.js';
import { auditImportToMarkdownFile } from './audit/auditImport.js';
import { isPathUnderRoot } from './audit/entryCrawl.js';
import { auditManifestPublishToFile } from './publishGates/auditManifestPublish.js';
import { scaffoldManifestFromFile } from './scaffold/scaffoldManifest.js';

type ParsedArgs = {
  command: string;
  file?: string;
  flags: Map<string, string | true>;
  /** Repeated `--entry` flags and comma-separated values, in argv order. */
  entries: string[];
};

const FILE_COMMANDS = new Set(['validate', 'normalize', 'summary', 'audit-publish', 'scaffold']);

const parseArgs = (argv: string[]): ParsedArgs => {
  const [command = 'help', ...rest] = argv;
  const flags = new Map<string, string | true>();
  const entries: string[] = [];
  const positionals: string[] = [];

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (!arg) continue;
    if (!arg.startsWith('--')) {
      positionals.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = rest[i + 1];
    if (next && !next.startsWith('--')) {
      flags.set(key, next);
      if (key === 'entry') {
        entries.push(
          ...next
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean),
        );
      }
      i += 1;
    } else {
      flags.set(key, true);
    }
  }

  const file = FILE_COMMANDS.has(command) ? positionals[0] : undefined;
  return { command, file, flags, entries };
};

const printHelp = (): void => {
  console.log(`Rheo flow import tools

Run these from the TARGET APP's root (so they scan the app, not the skill).
The scripts are self-contained — reference them by path, e.g.
  RHEO=/abs/path/to/rheo/rheo-flow-import
  cd <target-app> && node "$RHEO/scripts/audit-import.mjs" --entry app/onboarding.tsx

  node scripts/validate-manifest.mjs <manifest.json> [--offline-profile] [--profile-url <url>]
  node scripts/audit-publish-manifest.mjs <manifest.json> [--out <path>]
  node scripts/audit-import.mjs --entry <file|dir> [--entry <file|dir> ...] [--root <appRoot>] [--out <path>] [--screenshots <path>] [--max-files <n>] [--suggest-animations <path>]
  node scripts/scaffold-manifest.mjs <flow-spec.json> [--out <path>]
  node scripts/normalize-manifest.mjs <manifest.json> [--out <path>] [--write] [--target-flow-id <uuid>]
  node scripts/print-manifest-summary.mjs <manifest.json>
  node scripts/fetch-profile.mjs [--offline-profile] [--profile-url <url>]

audit requires at least one --entry. It crawls the import graph from each entry
(file) or source subtree (directory) — it does not scan the whole repo. Multiple
entries merge into one scoped graph. Anchors to the project root inferred from
--entry (nearest package.json / app.json / Package.swift), or to --root when given;
outputs are written relative to the current directory. Paths in <manifest.json>
resolve from the current dir.
`);
};

const readJson = async (path: string): Promise<unknown> => {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw) as unknown;
};

const requireFile = (file: string | undefined): string => {
  if (!file) {
    throw new Error('Missing manifest file path.');
  }
  return file;
};

/**
 * Run a single skill CLI command. Exposed so the committed bundle
 * (`rheo/rheo-flow-import/scripts/lib/rheo-cli.mjs`) can be imported by the thin
 * wrapper scripts and executed with plain `node`, no package resolution.
 */
export const runCli = async (command: string, args: string[]): Promise<number> => {
  return runArgv([command, ...args]);
};

const runArgv = async (argv: string[]): Promise<number> => {
  const args = parseArgs(argv);

  if (args.command === 'help' || args.command === '--help' || args.command === '-h') {
    printHelp();
    return 0;
  }

  if (args.command === 'profile') {
    const profile = await fetchManifestProfile({
      offline: args.flags.has('offline-profile'),
      url: args.flags.get('profile-url') as string | undefined,
    });
    console.log(`profile_source=${profile.source}`);
    console.log(`profile_version=${profile.version ?? 'unknown'}`);
    if (profile.url) console.log(`profile_url=${profile.url}`);
    return 0;
  }

  if (args.command === 'validate') {
    const result = await validateManifestFile(requireFile(args.file), {
      offlineProfile: args.flags.has('offline-profile'),
      profileUrl: args.flags.get('profile-url') as string | undefined,
    });
    console.log(`manifest_schema_version=${result.manifestSchemaVersion}`);
    console.log(`profile_source=${result.profile.source}`);
    console.log(`profile_version=${result.profile.version ?? 'unknown'}`);
    if (!result.ok) {
      console.error(formatIssues(result.issues));
      return 1;
    }
    console.log(JSON.stringify(result.summary, null, 2));
    if (result.warnings.length > 0) {
      console.warn(formatIssues(result.warnings));
    }
    return 0;
  }

  if (args.command === 'audit-publish') {
    const manifestPath = requireFile(args.file);
    const data = await readJson(manifestPath);
    const outRaw = args.flags.get('out') as string | undefined;
    const out = outRaw ?? 'rheo-import.publish-gates.md';
    const result = await auditManifestPublishToFile({
      manifestPath,
      data,
      out,
    });
    if (result.outPath) console.log(`publish_gate_report=${result.outPath}`);
    if (result.ok === false && result.kind === 'invalid_schema') {
      console.error(formatIssues(result.issues.map((i) => ({
        path: i.path ?? [],
        message: i.message,
        code: i.code,
        stepId: i.stepId ?? null,
      }))));
      return 1;
    }
    if (!result.ok) {
      result.blocking.forEach((issue) => {
        console.error(`[blocking] ${issue.code}: ${issue.message}`);
        console.error(`  fix: ${issue.fix}`);
      });
      return 1;
    }
    if (result.warnings.length > 0) {
      result.warnings.forEach((issue) => {
        console.warn(`[warning] ${issue.code}: ${issue.message}`);
      });
    }
    return 0;
  }

  if (args.command === 'audit') {
    const cwd = process.cwd();
    const resolveFromCwd = (value: string | undefined): string | undefined =>
      value === undefined ? undefined : isAbsolute(value) ? value : resolve(cwd, value);

    const maxFilesRaw = args.flags.get('max-files');
    const maxFiles =
      typeof maxFilesRaw === 'string' ? Number.parseInt(maxFilesRaw, 10) : undefined;

    const rootFlag = args.flags.get('root') as string | undefined;
    const explicitRoot = resolveFromCwd(rootFlag);

    const entrySpecs =
      args.entries.length > 0
        ? args.entries
        : typeof args.flags.get('entry') === 'string'
          ? (args.flags.get('entry') as string)
              .split(',')
              .map((value) => value.trim())
              .filter(Boolean)
          : [];

    if (entrySpecs.length === 0) {
      console.error('audit requires at least one --entry <file|dir>.');
      console.error(
        'The audit crawls imports from the entry point(s) only — it does not scan the whole repo.',
      );
      console.error(
        'Example: node scripts/audit-import.mjs --entry app/onboarding.tsx --entry app/paywall.tsx',
      );
      return 1;
    }

    const resolvedEntries = entrySpecs.map((spec) =>
      isAbsolute(spec) ? spec : resolve(explicitRoot ?? cwd, spec),
    );

    for (const entryPath of resolvedEntries) {
      if (!existsSync(entryPath)) {
        console.error(`Entry not found: ${entryPath}`);
        console.error(
          'Run the audit from the target app root, or pass --root <appRoot> with --entry paths inside it (or absolute --entry paths).',
        );
        return 1;
      }
    }

    const root =
      explicitRoot ?? (inferProjectRoot(resolvedEntries[0]!) ?? cwd);

    const auditRoot = resolve(root);
    for (const entryPath of resolvedEntries) {
      if (!isPathUnderRoot(auditRoot, entryPath)) {
        console.error(`Entry is outside audit root: ${entryPath}`);
        console.error(`Audit root: ${auditRoot}`);
        return 1;
      }
    }

    if (looksLikeSkillRoot(root)) {
      console.error(`Audit root resolves inside the Rheo skill itself: ${root}`);
      console.error(
        'cd into the target app (or pass --root <appRoot>) before running the audit — auditing the skill folder only scans its own examples.',
      );
      return 1;
    }

    const { outPath, report } = await auditImportToMarkdownFile({
      root,
      entries: resolvedEntries,
      out: resolveFromCwd(args.flags.get('out') as string | undefined),
      screenshots: resolveFromCwd(args.flags.get('screenshots') as string | undefined),
      maxFiles: Number.isFinite(maxFiles) ? maxFiles : undefined,
      suggestAnimations: resolveFromCwd(
        args.flags.get('suggest-animations') as string | undefined,
      ),
    });
    console.log(`audit_root=${report.root}`);
    console.log(`audit_entries=${report.entries?.join(', ') ?? report.entry ?? '(none)'}`);
    console.log(`audit_scope=${report.scopeMode ?? 'unknown'}`);
    console.log(`audit_scanned_files=${report.scannedFiles}`);
    console.log(`audit_report=${outPath}`);
    if (report.animationSuggestions?.length) {
      const suggestPath = resolveFromCwd(
        args.flags.get('suggest-animations') as string | undefined,
      );
      if (suggestPath) console.log(`animation_suggestions=${suggestPath}`);
    }
    return 0;
  }

  if (args.command === 'scaffold') {
    const specPath = requireFile(args.file);
    const out = args.flags.get('out') as string | undefined;
    const result = await scaffoldManifestFromFile(specPath, { out });
    if (!result.ok && result.kind === 'invalid_spec') {
      console.error('Invalid flow spec:');
      console.error(
        result.specIssues
          .map((issue) => {
            const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
            return `- ${path}: ${issue.message}`;
          })
          .join('\n'),
      );
      return 1;
    }
    if (result.outPath) {
      console.log(`scaffold_manifest=${result.outPath}`);
    } else {
      console.log(JSON.stringify(result.manifest, null, 2));
    }
    if (!result.ok) {
      console.error('Scaffolded manifest failed schema validation:');
      console.error(formatIssues(result.issues));
      return 1;
    }
    console.log('scaffold_status=schema_valid');
    return 0;
  }

  if (args.command === 'normalize') {
    const result = await normalizeManifestFile(requireFile(args.file), {
      targetFlowId: args.flags.get('target-flow-id') as string | undefined,
      outPath: args.flags.get('out') as string | undefined,
      write: args.flags.has('write'),
    });
    if (!args.flags.has('write') && !args.flags.has('out')) {
      console.log(JSON.stringify(result.manifest, null, 2));
    }
    if (!result.valid) {
      console.error(formatIssues(result.issues ?? []));
      return 1;
    }
    return 0;
  }

  if (args.command === 'summary') {
    const data = await readJson(requireFile(args.file));
    const validated = validateManifest(data);
    if (!validated.ok) {
      console.error(formatIssues(validated.issues));
      return 1;
    }
    console.log(JSON.stringify(summarizeManifest(validated.manifest), null, 2));
    return 0;
  }

  printHelp();
  return 1;
};

const isInvokedDirectly = (): boolean => {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return false;
  }
};

if (isInvokedDirectly()) {
  runArgv(process.argv.slice(2))
    .then((code) => {
      process.exitCode = code;
    })
    .catch((err: unknown) => {
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    });
}
