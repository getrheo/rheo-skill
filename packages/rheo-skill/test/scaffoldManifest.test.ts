import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { validateManifest, type ManifestValidationIssue } from '@getrheo/flow-runtime';
import { scaffoldManifest } from '../src/scaffold/scaffoldManifest.js';
import { scaffoldManifestFromFile } from '../src/scaffold/scaffoldManifest.js';
import { parseFlowSpec } from '../src/scaffold/flowSpecSchema.js';
import type { FlowSpec, LayerIntent } from '../src/scaffold/scaffoldTypes.js';

const formatIssues = (issues: ManifestValidationIssue[]): string =>
  issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message} [${i.code}]`).join('\n');

const expectValid = (spec: FlowSpec): Record<string, unknown> => {
  const manifest = scaffoldManifest(spec);
  const result = validateManifest(manifest);
  expect(result.ok, result.ok ? '' : formatIssues(result.issues)).toBe(true);
  return manifest;
};

/** Recursively collect every layer object from a scaffolded manifest. */
const collectLayers = (manifest: Record<string, unknown>): Record<string, unknown>[] => {
  const out: Record<string, unknown>[] = [];
  const visit = (node: unknown): void => {
    if (!node || typeof node !== 'object') return;
    const obj = node as Record<string, unknown>;
    if (typeof obj.kind === 'string' && typeof obj.id === 'string') out.push(obj);
    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  };
  for (const screen of manifest.screens as Record<string, unknown>[]) {
    visit((screen.regions as Record<string, unknown>).header);
    visit((screen.regions as Record<string, unknown>).body);
    visit((screen.regions as Record<string, unknown>).footer);
  }
  return out;
};

const screenWith = (body: LayerIntent[], extra: Partial<FlowSpec> = {}): FlowSpec => ({
  defaultLocale: 'en',
  entry: 'scr_main',
  screens: [{ id: 'scr_main', name: 'Main', body, next: null }],
  ...extra,
});

describe('scaffoldManifest — structural guarantees', () => {
  it('every layer id is lyr_* and screen ids are scr_*', () => {
    const manifest = expectValid(
      screenWith([
        { kind: 'text', text: 'Hello' },
        { kind: 'button', label: 'Go', action: 'continue' },
      ]),
    );
    for (const screen of manifest.screens as Record<string, unknown>[]) {
      expect(screen.id as string).toMatch(/^scr_[a-z0-9_]+$/i);
    }
    for (const layer of collectLayers(manifest)) {
      expect(layer.id as string).toMatch(/^lyr_[a-z0-9_]+$/i);
    }
  });

  it('button maps source variants to the Rheo enum and wraps the label in a text child', () => {
    const manifest = expectValid(
      screenWith([{ kind: 'button', label: 'Continue', variant: 'outline', action: 'continue' }]),
    );
    const button = collectLayers(manifest).find((l) => l.kind === 'button')!;
    expect(button.variant).toBe('secondary');
    expect(Array.isArray(button.children)).toBe(true);
    const label = (button.children as Record<string, unknown>[])[0]!;
    expect(label.kind).toBe('text');
    expect((label.text as Record<string, unknown>).default).toBe('Continue');
  });

  it('back_button has children, a valid variant, no action, and an ionicons child icon', () => {
    const manifest = expectValid(
      screenWith([{ kind: 'text', text: 'x' }], {
        screens: [
          {
            id: 'scr_main',
            name: 'Main',
            header: [{ kind: 'back_button', variant: 'text' }],
            body: [{ kind: 'text', text: 'Body' }],
            next: null,
          },
        ],
      }),
    );
    const back = collectLayers(manifest).find((l) => l.kind === 'back_button')!;
    expect(back.variant).toBe('ghost');
    expect(back).not.toHaveProperty('action');
    const icon = (back.children as Record<string, unknown>[])[0]!;
    expect(icon.kind).toBe('icon');
    expect(icon.family).toBe('ionicons');
  });

  it('single_choice builds option stacks, aligned optionBindings, and default branching', () => {
    const manifest = expectValid(
      screenWith(
        [
          {
            kind: 'single_choice',
            fieldKey: 'gender',
            options: [
              { optionId: 'male', label: 'Male' },
              { optionId: 'female', label: 'Female' },
            ],
          },
        ],
      ),
    );
    const choice = collectLayers(manifest).find((l) => l.kind === 'single_choice')!;
    expect(choice.fieldKey).toBe('gender');
    const children = choice.children as Record<string, unknown>[];
    const bindings = choice.optionBindings as Record<string, unknown>[];
    expect(children).toHaveLength(2);
    expect(bindings).toHaveLength(2);
    const childIds = new Set(children.map((c) => c.id as string));
    for (const binding of bindings) {
      expect(childIds.has(binding.rootLayerId as string)).toBe(true);
    }
    expect(choice.branching).toEqual({ enabled: false, conditions: [] });
  });

  it('multiple_choice carries min/max selections and choice branching', () => {
    const manifest = expectValid(
      screenWith([
        {
          kind: 'multiple_choice',
          fieldKey: 'topics',
          minSelections: 1,
          maxSelections: 2,
          branching: { enabled: false, conditions: [] },
          options: [
            { label: 'Sleep' },
            { label: 'Focus' },
            { label: 'Stress' },
          ],
        },
      ]),
    );
    const choice = collectLayers(manifest).find((l) => l.kind === 'multiple_choice')!;
    expect(choice.minSelections).toBe(1);
    expect(choice.maxSelections).toBe(2);
    expect((choice.optionBindings as unknown[]).length).toBe(3);
  });

  it('text_input gets a default classification and continue button', () => {
    const manifest = expectValid(
      screenWith([
        { kind: 'text_input', fieldKey: 'first_name', placeholder: 'Your name' },
        { kind: 'button', label: 'Continue', action: 'continue' },
      ]),
    );
    const input = collectLayers(manifest).find((l) => l.kind === 'text_input')!;
    expect(input.classification).toBe('safe');
    expect((input.placeholder as Record<string, unknown>).default).toBe('Your name');
  });

  it('scale_input requires a continue button and passes through bounds', () => {
    const manifest = expectValid(
      screenWith([
        { kind: 'scale_input', fieldKey: 'mood', min: 1, max: 5, defaultValue: 3 },
        { kind: 'button', label: 'Continue', action: 'continue' },
      ]),
    );
    const input = collectLayers(manifest).find((l) => l.kind === 'scale_input')!;
    expect(input.min).toBe(1);
    expect(input.max).toBe(5);
  });

  it('oauth_login builds oauth_provider children with a generated rowId for custom rows', () => {
    const manifest = expectValid(
      screenWith([
        {
          kind: 'oauth_login',
          providers: [
            { type: 'preset', provider: 'apple' },
            { type: 'custom', label: 'Sign in with SSO', iconName: 'shield-outline' },
          ],
        },
      ]),
    );
    const login = collectLayers(manifest).find((l) => l.kind === 'oauth_login')!;
    const rows = login.children as Record<string, unknown>[];
    expect(rows).toHaveLength(2);
    const custom = rows.find((r) => r.variant === 'custom')!;
    expect(typeof custom.rowId).toBe('string');
    expect((custom.rowId as string).length).toBeGreaterThan(0);
  });

  it('email_password_auth (sign_up) builds email/password/confirm fields plus a submit', () => {
    const manifest = expectValid(
      screenWith([
        { kind: 'email_password_auth', fieldKey: 'account', mode: 'sign_up' },
      ]),
    );
    const auth = collectLayers(manifest).find((l) => l.kind === 'email_password_auth')!;
    const children = auth.children as Record<string, unknown>[];
    const slots = children
      .filter((c) => c.kind === 'email_password_field')
      .map((c) => c.slot);
    expect(slots).toEqual(['email', 'password', 'confirm']);
    expect(children.filter((c) => c.kind === 'email_password_submit')).toHaveLength(1);
  });

  it('permission button captures the permission outcomes and routes', () => {
    const manifest = expectValid({
      defaultLocale: 'en',
      entry: 'scr_perm',
      screens: [
        {
          id: 'scr_perm',
          name: 'Permission',
          body: [
            {
              kind: 'button',
              label: 'Enable notifications',
              action: {
                kind: 'request_os_permission',
                permissionKey: 'notifications',
                outcomes: { granted: 'continue', denied: 'continue', blocked: 'continue' },
              },
            },
          ],
          next: 'scr_done',
        },
        {
          id: 'scr_done',
          name: 'Done',
          body: [{ kind: 'button', label: 'Finish', action: 'end_flow' }],
          next: null,
        },
      ],
    });
    const button = collectLayers(manifest).find(
      (l) => l.kind === 'button' && (l.action as Record<string, unknown>).kind === 'request_os_permission',
    )!;
    expect((button.action as Record<string, unknown>).permissionKey).toBe('notifications');
  });

  it('carousel emits one slide stack per page and stays swipe-only', () => {
    const manifest = expectValid(
      screenWith([
        {
          kind: 'carousel',
          pageControl: { position: 'bottom' },
          slides: [
            { children: [{ kind: 'text', text: 'Slide 1' }] },
            { children: [{ kind: 'text', text: 'Slide 2' }] },
          ],
        },
      ]),
    );
    const carousel = collectLayers(manifest).find((l) => l.kind === 'carousel')!;
    const slides = carousel.slides as Record<string, unknown>[];
    expect(slides).toHaveLength(2);
    slides.forEach((slide) => expect(slide.kind).toBe('stack'));
  });

  it('decision nodes and RevenueCat external surfaces wire entry, outcomes, and fallback', () => {
    const manifest = expectValid({
      defaultLocale: 'en',
      entry: 'dec_platform',
      screens: [
        {
          id: 'scr_paywall_intro',
          name: 'Paywall intro',
          body: [{ kind: 'button', label: 'See plans', action: 'continue' }],
          next: 'surf_paywall',
        },
        {
          id: 'scr_done',
          name: 'Done',
          body: [{ kind: 'button', label: 'Finish', action: 'end_flow' }],
          next: null,
        },
      ],
      decisions: [
        {
          id: 'dec_platform',
          name: 'Platform',
          cases: [
            {
              id: 'case_ios',
              name: 'iOS',
              expression: {
                kind: 'predicate',
                variable: { kind: 'builtin', name: 'platform' },
                predicate: { type: 'string', pred: { op: 'eq', value: 'ios' } },
              },
              next: 'scr_paywall_intro',
            },
          ],
          elseNext: 'scr_paywall_intro',
        },
      ],
      externalSurfaces: [
        {
          id: 'surf_paywall',
          provider: 'revenuecat',
          offeringId: 'default',
          outcomes: { purchase_completed: 'scr_done' },
          fallback: 'scr_done',
        },
      ],
    });
    expect(manifest.entryScreenId).toBe('dec_platform');
    const surface = (manifest.externalSurfaceNodes as Record<string, unknown>[])[0]!;
    expect((surface.config as Record<string, unknown>).provider).toBe('revenuecat');
    expect(surface.fallback).toBe('scr_done');
  });

  it('hyperlink always has at least one child', () => {
    const manifest = expectValid(
      screenWith([{ kind: 'hyperlink', href: 'https://example.com', label: 'Terms' }]),
    );
    const link = collectLayers(manifest).find((l) => l.kind === 'hyperlink')!;
    expect((link.children as unknown[]).length).toBeGreaterThanOrEqual(1);
  });
});

describe('scaffoldManifestFromFile — round trip', () => {
  it('expands the bundled example spec into a schema-valid manifest', async () => {
    const specPath = resolve(__dirname, '../rheo/rheo-flow-import/examples/flow-spec.example.json');
    const result = await scaffoldManifestFromFile(specPath);
    if (!result.ok && result.kind === 'invalid_manifest') {
      throw new Error(formatIssues(result.issues));
    }
    expect(result.ok).toBe(true);
  });

  it('reports spec issues for malformed specs', () => {
    const parsed = parseFlowSpec({ screens: [] });
    expect(parsed.ok).toBe(false);
  });
});
