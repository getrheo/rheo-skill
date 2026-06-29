import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { BUTTON_LAYER_VARIANTS, LAYER_KINDS, MANIFEST_SCHEMA_VERSION, OS_PERMISSION_KEYS } from '@getrheo/contracts';
import {
  BUTTON_ACTION_KINDS,
  generateCapabilitiesMarkdown,
} from '../src/capabilities/generateCapabilities.js';

const capabilitiesPath = resolve(
  __dirname,
  '../rheo/rheo-flow-import/references/capabilities.md',
);

const readCapabilities = async (): Promise<string> => readFile(capabilitiesPath, 'utf8');

describe('capability cheat-sheet drift checks', () => {
  it('committed capabilities.md matches the generator output', async () => {
    const committed = await readCapabilities();
    expect(committed.trimEnd()).toBe(generateCapabilitiesMarkdown().trimEnd());
  });

  it('documents the current manifest schema version', async () => {
    const md = await readCapabilities();
    expect(md).toContain(`Manifest schema version: ${MANIFEST_SCHEMA_VERSION}`);
  });

  it('documents every layer kind', async () => {
    const md = await readCapabilities();
    LAYER_KINDS.forEach((kind) => {
      expect(md).toContain(`\`${kind}\``);
    });
  });

  it('documents every button action kind', async () => {
    const md = await readCapabilities();
    BUTTON_ACTION_KINDS.forEach((action) => {
      expect(md).toContain(`\`${action}\``);
    });
  });

  it('documents every OS permission key', async () => {
    const md = await readCapabilities();
    OS_PERMISSION_KEYS.forEach((key) => {
      expect(md).toContain(`\`${key}\``);
    });
  });

  it('documents every button variant', async () => {
    const md = await readCapabilities();
    BUTTON_LAYER_VARIANTS.forEach((variant) => {
      expect(md).toContain(`\`${variant}\``);
    });
  });
});
