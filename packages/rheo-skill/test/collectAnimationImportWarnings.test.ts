import { describe, expect, it } from 'vitest';
import type { FlowManifest } from '@getrheo/contracts/manifest';
import { collectAnimationImportWarnings } from '../src/collectAnimationImportWarnings.js';

const manifestWithBadClip = (): FlowManifest =>
  ({
    flowId: '550e8400-e29b-41d4-a716-446655440002',
    version: 1,
    schemaVersion: 7,
    defaultLocale: 'en',
    locales: ['en'],
    entryScreenId: 's1',
    screens: [
      {
        id: 's1',
        name: 'Welcome',
        next: { default: null },
        regions: {
          body: { id: 'lyr_body', kind: 'text', text: { default: 'Hi' } },
        },
        animations: [
          {
            id: 'clip_bad',
            targetLayerId: 'missing_layer',
            trigger: 'stagger',
            durationMs: 320,
            tracks: [
              {
                property: 'opacity',
                keyframes: [
                  { t: 0, value: 0 },
                  { t: 1, value: 1 },
                ],
              },
            ],
          },
        ],
      },
    ],
    decisionNodes: [],
    externalSurfaceNodes: [],
    sdkAttributeKeys: [],
    builderMeta: {},
  }) as unknown as FlowManifest;

describe('collectAnimationImportWarnings', () => {
  it('warns on missing target layer and stagger without index', () => {
    const issues = collectAnimationImportWarnings(manifestWithBadClip());
    expect(issues.some((i) => i.code === 'animation_target_layer_missing')).toBe(true);
    expect(issues.some((i) => i.code === 'animation_stagger_index_required')).toBe(true);
  });
});
