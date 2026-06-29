import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditImport, auditImportToMarkdownFile } from '../src/audit/auditImport';
import { renderAuditMarkdown } from '../src/audit/renderAuditMarkdown';

const fixtureRoot = resolve(__dirname, 'fixtures/audit');

describe('auditImport', () => {
  it('reports regions, styles, backgrounds, assets, and Lottie evidence', async () => {
    const report = await auditImport({
      root: fixtureRoot,
      entry: 'Onboarding.tsx',
      maxFiles: 50,
    });
    const markdown = renderAuditMarkdown(report);

    expect(markdown).toContain('regions.header');
    expect(markdown).toContain('regions.footer');
    expect(markdown).toContain('#6D5DF6');
    expect(markdown).toContain('LinearGradient');
    expect(markdown).toContain('linear-gradient');
    expect(markdown).toContain('Carousel');
    expect(markdown).toContain('infoSteps');
    expect(markdown).toContain('swipe-only');
    expect(markdown).toContain('align');
    expect(markdown).toContain('shadow');
    expect(markdown).toContain('Mandatory Intake Questionnaire');
    expect(markdown).toContain('assets/hero.png');
    expect(markdown).toContain('assets/welcome.json');
    expect(markdown).toContain('placeholder id');
    expect(markdown).toContain('Custom Font Evidence');
    expect(markdown).toContain('Font.loadAsync');
    expect(markdown).toContain('CalSans-Regular.ttf');
    expect(markdown).toContain('Choice Option Default And Selected State Evidence');
    expect(markdown).toContain('selectedStyle');
    expect(markdown).toContain('border-primary-500');
  });

  it('reports animation evidence, intake Q6, and stagger presets', async () => {
    const animRoot = resolve(fixtureRoot, 'animations');
    const report = await auditImport({
      root: animRoot,
      entry: 'WelcomeScreen.tsx',
      maxFiles: 50,
    });
    const markdown = renderAuditMarkdown(report);

    expect(markdown).toContain('Match motion from the codebase');
    expect(markdown).toContain('Animation And Motion Evidence');
    expect(markdown).toContain('fade-in');
    expect(markdown).toContain('staggerIndex');
    expect(report.animationSuggestions?.some((s) => s.screenId === 'welcome')).toBe(true);
  });

  it('reports i18n evidence and resolved default-locale strings', async () => {
    const i18nRoot = resolve(fixtureRoot, 'i18n');
    const report = await auditImport({
      root: i18nRoot,
      entry: 'OnboardingScreen.tsx',
      maxFiles: 50,
    });
    const markdown = renderAuditMarkdown(report);

    expect(markdown).toContain('Localization And I18n Evidence');
    expect(markdown).toContain('fallback locale');
    expect(markdown).toContain('onboarding.welcome.title');
    expect(markdown).toContain('Welcome aboard');
    expect(markdown).toContain('localization-import.md');
  });

  it('flags unmapped spring motion and SwiftUI opacity transition', async () => {
    const animRoot = resolve(fixtureRoot, 'animations');
    const springReport = await auditImport({
      root: animRoot,
      entry: 'SpringHero.tsx',
      maxFiles: 20,
    });
    expect(
      springReport.findings.some(
        (f) => f.kind === 'animation' && f.recommendation.includes('Unmapped'),
      ),
    ).toBe(true);

    const swiftReport = await auditImport({
      root: animRoot,
      entry: 'WelcomeView.swift',
      maxFiles: 20,
    });
    expect(
      swiftReport.findings.some(
        (f) => f.kind === 'animation' && f.evidence.includes('.transition'),
      ),
    ).toBe(true);
  });

  it('writes animation suggestions JSON when requested', async () => {
    const dir = await mkdtemp(resolve(tmpdir(), 'rheo-anim-suggest-'));
    try {
      const animRoot = resolve(fixtureRoot, 'animations');
      const suggestOut = resolve(dir, 'rheo-import.animations.json');
      await auditImportToMarkdownFile({
        root: animRoot,
        entry: 'WelcomeScreen.tsx',
        out: resolve(dir, 'audit.md'),
        suggestAnimations: suggestOut,
        maxFiles: 50,
      });
      const raw = await readFile(suggestOut, 'utf8');
      expect(raw).toContain('"fade-in"');
      expect(raw).toContain('welcome');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('writes the markdown audit report to disk', async () => {
    const dir = await mkdtemp(resolve(tmpdir(), 'rheo-audit-'));
    try {
      const out = resolve(dir, 'rheo-import.audit.md');
      const result = await auditImportToMarkdownFile({
        root: fixtureRoot,
        entry: 'Onboarding.tsx',
        out,
        maxFiles: 50,
      });

      expect(result.outPath).toBe(out);
      await expect(readFile(out, 'utf8')).resolves.toContain('Rheo Import Audit');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
