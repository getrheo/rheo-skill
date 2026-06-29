import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { validateManifestFile } from '../src/validateManifestFile';

const fixture = (name: string) => resolve(__dirname, `fixtures/${name}`);
const example = (name: string) => resolve(__dirname, `../rheo/rheo-flow-import/examples/${name}`);

describe('validateManifestFile', () => {
  it('validates bundled examples using the fallback profile', async () => {
    const result = await validateManifestFile(example('linear-onboarding.manifest.json'), {
      offlineProfile: true,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.summary.screenCount).toBe(2);
      expect(result.profile.source).toBe('fallback');
    }
  });

  it('returns validation issues for invalid manifests', async () => {
    const result = await validateManifestFile(fixture('invalid.manifest.json'), {
      offlineProfile: true,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.length).toBeGreaterThan(0);
    }
  });
});
