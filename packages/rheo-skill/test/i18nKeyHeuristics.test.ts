import { describe, expect, it } from 'vitest';
import { looksLikeI18nKey } from '../src/audit/i18nKeyHeuristics.js';

describe('looksLikeI18nKey', () => {
  it('flags dotted keys and namespaces', () => {
    expect(looksLikeI18nKey('onboarding.welcome.title')).toBe(true);
    expect(looksLikeI18nKey('common:button.next')).toBe(true);
  });

  it('allows normal copy', () => {
    expect(looksLikeI18nKey('Welcome aboard')).toBe(false);
    expect(looksLikeI18nKey('Continue')).toBe(false);
  });
});
