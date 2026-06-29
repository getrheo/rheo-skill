import { describe, expect, it } from 'vitest';
import { normalizeManifestObject } from '../src/normalizeManifestFile';

describe('normalizeManifestObject', () => {
  it('adds missing graph arrays without changing copy', () => {
    const result = normalizeManifestObject({
      flowId: '00000000-0000-0000-0000-000000000001',
      schemaVersion: 7,
      version: 1,
      defaultLocale: 'en',
      locales: ['en'],
      entryScreenId: 'scr_blank',
      theme: {},
      screens: [
        {
          id: 'scr_blank',
          name: 'Blank',
          regions: {
            body: {
              id: 'lyr_body',
              kind: 'stack',
              direction: 'vertical',
              children: [],
            },
          },
          next: { default: null },
        },
      ],
    });

    expect(result.changed).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.manifest).toMatchObject({
      decisionNodes: [],
      externalSurfaceNodes: [],
      sdkAttributeKeys: [],
    });
  });
});
