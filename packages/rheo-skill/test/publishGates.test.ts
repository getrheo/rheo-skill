import { describe, expect, it } from 'vitest';
import { MANIFEST_SCHEMA_VERSION } from '@getrheo/contracts';
import type { FlowManifest } from '@getrheo/contracts/manifest';
import { collectPublishGateIssues, fixForBuilderMessage } from '../src/publishGates/collectPublishGateIssues';
import { renderPublishGateMarkdown } from '../src/publishGates/renderPublishGateMarkdown';

const minimalPublishable = (): FlowManifest =>
  ({
    flowId: '00000000-0000-0000-0000-000000000001',
    schemaVersion: MANIFEST_SCHEMA_VERSION,
    version: 1,
    defaultLocale: 'en',
    locales: ['en'],
    entryScreenId: 'scr_a',
    theme: {
      primary: '#111111',
      primaryForeground: '#FFFFFF',
      background: '#FFFFFF',
      foreground: '#111111',
      borderRadius: 12,
    },
    screens: [
      {
        id: 'scr_a',
        name: 'A',
        regions: {
          body: {
            id: 'lyr_body',
            kind: 'stack',
            direction: 'vertical',
            children: [
              {
                id: 'lyr_title',
                kind: 'text',
                text: { default: 'Hello' },
                style: { color: '#111111' },
              },
              {
                id: 'lyr_cta',
                kind: 'button',
                variant: 'primary',
                action: { kind: 'end_flow' },
                children: [
                  {
                    id: 'lyr_cta_label',
                    kind: 'text',
                    text: { default: 'Done' },
                    style: { color: '#FFFFFF' },
                  },
                ],
              },
            ],
          },
        },
        next: { default: null },
      },
    ],
    decisionNodes: [],
    externalSurfaceNodes: [],
    sdkAttributeKeys: [],
  }) as unknown as FlowManifest;

describe('collectPublishGateIssues', () => {
  it('passes a minimal publishable manifest', () => {
    const result = collectPublishGateIssues(minimalPublishable());
    expect(result.kind).toBe('validated');
    if (result.kind === 'invalid_schema') return;
    expect(result.ok).toBe(true);
    expect(result.blocking).toHaveLength(0);
  });

  it('blocks text layers missing style.color (dashboard publish rule)', () => {
    const manifest = minimalPublishable();
    const body = manifest.screens[0]!.regions.body;
    (body.children as Array<{ id: string; kind: string; style?: unknown; text?: unknown }>)[0] = {
      id: 'lyr_title',
      kind: 'text',
      text: { default: 'Hello' },
    };
    const result = collectPublishGateIssues(manifest);
    expect(result.kind).toBe('validated');
    if (result.kind === 'invalid_schema') return;
    expect(result.ok).toBe(false);
    expect(result.blocking.some((i) => i.message.includes('style.color'))).toBe(true);
    expect(result.blocking[0]?.fix).toContain('style.color');
  });

  it('requires Continue on manual-submit input screens', () => {
    const manifest = minimalPublishable();
    const body = manifest.screens[0]!.regions.body;
    body.children = [
      {
        id: 'lyr_in',
        kind: 'text_input',
        fieldKey: 'email',
        classification: 'safe',
      },
    ];
    manifest.screens[0]!.next = { default: null };
    const result = collectPublishGateIssues(manifest);
    expect(result.kind).toBe('validated');
    if (result.kind === 'invalid_schema') return;
    expect(result.blocking.some((i) => i.message.includes('continue'))).toBe(true);
  });
});

describe('fixForBuilderMessage', () => {
  it('mentions button nested text for color issues', () => {
    expect(fixForBuilderMessage('text layer "x" must set style.color')).toContain('nested text');
  });
});

describe('renderPublishGateMarkdown', () => {
  it('marks blocked manifests clearly', () => {
    const manifest = minimalPublishable();
    const body = manifest.screens[0]!.regions.body;
    (body.children as Array<Record<string, unknown>>)[0] = {
      id: 'lyr_title',
      kind: 'text',
      text: { default: 'Hello' },
    };
    const result = collectPublishGateIssues(manifest);
    const md = renderPublishGateMarkdown('rheo-import.manifest.json', result);
    expect(md).toContain('BLOCKED');
    expect(md).toContain('style.color');
    expect(result.kind).toBe('validated');
  });
});
