#!/usr/bin/env tsx
import { build } from 'esbuild';
import { chmod, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** esbuild path comments reflect pnpm's on-disk layout, which differs by OS. */
const normalizeEsbuildPathComments = (code: string): string =>
  code.replace(
    /^\/\/ (\.\.\/)+node_modules\/\.pnpm\/[^/\n]+\/node_modules\//gm,
    '// ../../node_modules/',
  );

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

  const raw = await readFile(outfile, 'utf8');
  const normalized = normalizeEsbuildPathComments(raw);
  if (normalized !== raw) {
    await writeFile(outfile, normalized);
  }
  await chmod(outfile, 0o644);
  console.log(`bundle=${outfile}`);
  console.log(`bundle_size=${(normalized.length / 1024).toFixed(1)}kb`);
};

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});
