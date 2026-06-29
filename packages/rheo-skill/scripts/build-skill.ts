#!/usr/bin/env tsx
import { build } from 'esbuild';
import { chmod } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(packageRoot, 'src/cli.ts');
const outfile = resolve(
  packageRoot,
  'rheo/rheo-flow-import/scripts/lib/rheo-cli.mjs',
);

const banner = [
  '// GENERATED — do not edit.',
  '// Self-contained Rheo flow-import CLI bundle (zod + @getrheo/contracts + @getrheo/flow-runtime inlined).',
  `// Rebuild with: pnpm --filter @getrheo/rheo-skill build`,
].join('\n');

const main = async (): Promise<void> => {
  const result = await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node20',
    sourcemap: false,
    legalComments: 'none',
    banner: { js: banner },
    logLevel: 'info',
    metafile: true,
  });

  const bytes = Object.values(result.metafile.outputs)[0]?.bytes ?? 0;
  await chmod(outfile, 0o644);
  console.log(`bundle=${outfile}`);
  console.log(`bundle_size=${(bytes / 1024).toFixed(1)}kb`);
};

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});
