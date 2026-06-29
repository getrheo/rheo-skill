import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

const bundlePath = resolve(
  __dirname,
  '../rheo/rheo-flow-import/scripts/lib/rheo-cli.mjs',
);
const example = (name: string) =>
  resolve(__dirname, `../rheo/rheo-flow-import/examples/${name}`);

/**
 * The committed bundle is what ships in the skill and runs with plain `node` (no
 * install). These tests prove the bundle exists and is functional; if `src/` or
 * the contracts changed without a rebuild, `pnpm build` is stale and CI fails.
 */
describe('self-contained skill bundle', () => {
  it('is committed at the shipped scripts/lib path', () => {
    expect(existsSync(bundlePath)).toBe(true);
  });

  it('validates a bundled example via the exported runCli', async () => {
    const { runCli } = (await import(pathToFileURL(bundlePath).href)) as {
      runCli: (command: string, args: string[]) => Promise<number>;
    };
    const code = await runCli('validate', [
      example('linear-onboarding.manifest.json'),
      '--offline-profile',
    ]);
    expect(code).toBe(0);
  });

  it('scaffolds the example flow spec into a schema-valid manifest', async () => {
    const { runCli } = (await import(pathToFileURL(bundlePath).href)) as {
      runCli: (command: string, args: string[]) => Promise<number>;
    };
    const code = await runCli('scaffold', [example('flow-spec.example.json')]);
    expect(code).toBe(0);
  });
});
