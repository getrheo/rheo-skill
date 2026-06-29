import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LAYER_KINDS, MANIFEST_SCHEMA_VERSION } from '@getrheo/contracts';

const profilePath = resolve(__dirname, 'fixtures/agent-manifest-profile.mdx');

describe('Manifest Agent Profile drift checks', () => {
  it('documents the current manifest schema version', async () => {
    const profile = await readFile(profilePath, 'utf8');

    expect(profile).toContain(`Manifest schema version: ${MANIFEST_SCHEMA_VERSION}`);
  });

  it('documents every current layer kind', async () => {
    const profile = await readFile(profilePath, 'utf8');

    LAYER_KINDS.forEach((kind) => {
      expect(profile).toContain(kind);
    });
  });
});
