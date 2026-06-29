import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { afterEach, describe, expect, it } from 'vitest';
import { collectBundleImportWarnings } from '../src/collectBundleImportWarnings.js';

describe('collectBundleImportWarnings', () => {
  let dir = '';

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true });
    dir = '';
  });

  it('flags font paths in rheo-import.assets.json', async () => {
    dir = join(tmpdir(), `bundle-warn-${Date.now()}`);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'rheo-import.manifest.json'), '{}');
    await writeFile(
      join(dir, 'rheo-import.assets.json'),
      JSON.stringify({
        assets: [
          {
            id: '00000000-0000-0000-0000-000000000101',
            path: 'assets/fonts/CalSans-Regular.ttf',
            type: 'image',
            contentType: 'image/png',
          },
        ],
      }),
    );

    const issues = await collectBundleImportWarnings(join(dir, 'rheo-import.manifest.json'));
    expect(issues).toHaveLength(1);
    expect(issues[0]?.code).toBe('bundle_font_in_assets_json');
    expect(issues[0]?.message).toMatch(/rheo-import.fonts.json/);
  });

  it('returns no issues when assets.json is absent', async () => {
    dir = join(tmpdir(), `bundle-warn-empty-${Date.now()}`);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'rheo-import.manifest.json'), '{}');

    const issues = await collectBundleImportWarnings(join(dir, 'rheo-import.manifest.json'));
    expect(issues).toHaveLength(0);
  });
});
