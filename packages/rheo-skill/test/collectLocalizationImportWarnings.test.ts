import { describe, expect, it } from 'vitest';
import { collectLocalizationImportWarnings } from '../src/collectLocalizationImportWarnings.js';
import { validFlow } from '@rheo/contracts-fixtures/validFlow';

describe('collectLocalizationImportWarnings', () => {
  it('warns when text.default looks like a translation key', () => {
    const manifest = validFlow();
    const screen = manifest.screens[0]!;
    const body = screen.regions.body;
    if (body.kind === 'stack') {
      const textLayer = body.children.find((c) => c.kind === 'text');
      if (textLayer?.kind === 'text') {
        textLayer.text = { default: 'onboarding.welcome.title' };
      }
    }

    const issues = collectLocalizationImportWarnings(manifest);
    expect(issues.some((i) => i.code === 'manifest_i18n_key_in_default')).toBe(true);
  });
});
