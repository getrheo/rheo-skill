import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const bundlePath = resolve(
  __dirname,
  '../rheo/rheo-flow-import/scripts/lib/rheo-cli.mjs',
);

const FORBIDDEN_BUNDLE_MARKERS = [
  'dashboard/flows',
  'dashboard/channels',
  'planEntitlements',
  'workspaceCapabilities',
  'RolloutRequest',
  'BillingPlanKey',
];

describe('rheo-cli bundle leakage', () => {
  it('does not embed platform-only contract modules', () => {
    const bundle = readFileSync(bundlePath, 'utf8');
    for (const marker of FORBIDDEN_BUNDLE_MARKERS) {
      expect(bundle.includes(marker)).toBe(false);
    }
  });
});
