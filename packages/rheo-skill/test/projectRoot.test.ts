import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { inferProjectRoot, looksLikeSkillRoot } from '../src/audit/projectRoot';
import { auditImport } from '../src/audit/auditImport';

let appRoot: string;

beforeAll(async () => {
  appRoot = await mkdtemp(resolve(tmpdir(), 'rheo-approot-'));
  await writeFile(resolve(appRoot, 'package.json'), '{"name":"host-app"}\n');
  await mkdir(resolve(appRoot, 'app/onboarding'), { recursive: true });
  await writeFile(
    resolve(appRoot, 'app/onboarding/Welcome.tsx'),
    "import { Hero } from '../../components/Hero';\nexport const Welcome = () => <Hero />;\n",
  );
  await mkdir(resolve(appRoot, 'components'), { recursive: true });
  await writeFile(
    resolve(appRoot, 'components/Hero.tsx'),
    'export const Hero = () => null;\n',
  );
});

afterAll(async () => {
  await rm(appRoot, { recursive: true, force: true });
});

describe('inferProjectRoot', () => {
  it('walks up from a nested entry file to the nearest package.json', () => {
    const entry = resolve(appRoot, 'app/onboarding/Welcome.tsx');
    expect(inferProjectRoot(entry)).toBe(appRoot);
  });

  it('returns the directory itself when it contains a marker', () => {
    expect(inferProjectRoot(appRoot)).toBe(appRoot);
  });

  it('returns undefined when no marker is found', () => {
    expect(inferProjectRoot('/')).toBeUndefined();
  });
});

describe('looksLikeSkillRoot', () => {
  it('is false for an ordinary app root', () => {
    expect(looksLikeSkillRoot(appRoot)).toBe(false);
  });

  it('is true for the shipped rheo-flow-import skill folder', () => {
    const skillRoot = resolve(__dirname, '../rheo');
    expect(looksLikeSkillRoot(skillRoot)).toBe(true);
  });
});

describe('auditImport directory entry', () => {
  it('scopes to a directory subtree when --entry is a folder', async () => {
    const report = await auditImport({
      root: appRoot,
      entry: resolve(appRoot, 'app/onboarding'),
      maxFiles: 50,
    });
    expect(report.entry).toBe('app/onboarding');
    expect(report.scannedFiles).toBeGreaterThan(0);
  });
});
