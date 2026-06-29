import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { auditImport } from '../src/audit/auditImport';
import { crawlFromEntries } from '../src/audit/entryCrawl';

let appRoot: string;

beforeAll(async () => {
  appRoot = await mkdtemp(resolve(tmpdir(), 'rheo-crawl-'));
  await writeFile(resolve(appRoot, 'package.json'), '{"name":"host-app"}\n');
  await mkdir(resolve(appRoot, 'app/onboarding'), { recursive: true });
  await mkdir(resolve(appRoot, 'app/unrelated'), { recursive: true });
  await mkdir(resolve(appRoot, 'components'), { recursive: true });

  await writeFile(
    resolve(appRoot, 'app/onboarding/Welcome.tsx'),
    "import { Hero } from '../../components/Hero';\nexport const Welcome = () => <Hero />;\n",
  );
  await writeFile(
    resolve(appRoot, 'components/Hero.tsx'),
    'export const Hero = () => null;\n',
  );
  await writeFile(
    resolve(appRoot, 'app/unrelated/Settings.tsx'),
    'export const Settings = () => null;\n// NOISE_MARKER_SHOULD_NOT_APPEAR\n',
  );
});

afterAll(async () => {
  await rm(appRoot, { recursive: true, force: true });
});

describe('crawlFromEntries', () => {
  it('follows relative imports and excludes unrelated files', async () => {
    const { files, scopeMode } = await crawlFromEntries({
      root: appRoot,
      entries: ['app/onboarding/Welcome.tsx'],
    });

    expect(scopeMode).toBe('import-graph');
    const paths = files.map((file) => file.path).sort();
    expect(paths).toContain('app/onboarding/Welcome.tsx');
    expect(paths).toContain('components/Hero.tsx');
    expect(paths).toContain('package.json');
    expect(paths).not.toContain('app/unrelated/Settings.tsx');
  });

  it('merges multiple file entries into one graph', async () => {
    await writeFile(
      resolve(appRoot, 'app/other.tsx'),
      "import { Hero } from '../components/Hero';\nexport const Other = () => <Hero />;\n",
    );

    const { files } = await crawlFromEntries({
      root: appRoot,
      entries: ['app/onboarding/Welcome.tsx', 'app/other.tsx'],
    });

    const paths = files.map((file) => file.path);
    expect(paths).toContain('app/onboarding/Welcome.tsx');
    expect(paths).toContain('app/other.tsx');
    expect(paths).not.toContain('app/unrelated/Settings.tsx');
  });

  it('scopes directory entries to that subtree only', async () => {
    const { files, scopeMode } = await crawlFromEntries({
      root: appRoot,
      entries: ['app/onboarding'],
    });

    expect(scopeMode).toBe('directory');
    const paths = files.map((file) => file.path);
    expect(paths).toContain('app/onboarding/Welcome.tsx');
    expect(paths).not.toContain('app/unrelated/Settings.tsx');
  });
});

describe('auditImport entry crawl', () => {
  it('does not scan unrelated files when entry is provided', async () => {
    const report = await auditImport({
      root: appRoot,
      entry: 'app/onboarding/Welcome.tsx',
      maxFiles: 50,
    });

    expect(report.scopeMode).toBe('import-graph');
    expect(report.scannedFiles).toBeLessThan(10);
    expect(report.findings.every((f) => !f.evidence.includes('NOISE_MARKER'))).toBe(true);
  });
});
