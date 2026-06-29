#!/usr/bin/env node
/**
 * Validate shipped SKILL.md trees against the agentskills.io reference validator.
 *
 * Uses the official skills-ref CLI (pip-installed from agentskills/agentskills).
 * First run creates packages/rheo-skill/.venv-skills-ref (gitignored).
 *
 * Usage:
 *   node scripts/validate-skill-format.mjs
 *   pnpm --filter @getrheo/rheo-skill validate:skill-format
 */
import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Pinned agentskills/skills-ref for reproducible CI and local runs. */
const SKILLS_REF_GIT_REF = '5d4c1fda3f786fff826c7f56b6cb3341e7f3a911';
const SKILLS_REF_INSTALL = `git+https://github.com/agentskills/agentskills.git@${SKILLS_REF_GIT_REF}#subdirectory=skills-ref`;

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const venvDir = resolve(packageRoot, '.venv-skills-ref');
const isWindows = process.platform === 'win32';
const venvPython = resolve(
  venvDir,
  isWindows ? 'Scripts/python.exe' : 'bin/python',
);
const skillsRefBin = resolve(
  venvDir,
  isWindows ? 'Scripts/skills-ref.exe' : 'bin/skills-ref',
);

const skillDirs = [
  resolve(packageRoot, 'rheo'),
  resolve(packageRoot, 'rheo/rheo-best-practices'),
  resolve(packageRoot, 'rheo/rheo-flow-import'),
];

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    ...options,
  });
  if (result.error) {
    console.error(`[validate-skill-format] Failed to run ${command}:`, result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const resolveSystemPython = () => {
  const candidates = [
    process.env.PYTHON,
    process.env.PYTHON3,
    'python3',
    'python',
  ].filter((value, index, list) => value && list.indexOf(value) === index);

  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ['--version'], { encoding: 'utf8' });
    if (probe.status === 0) {
      return candidate;
    }
  }

  console.error(
    '[validate-skill-format] Python 3.11+ is required but was not found on PATH.',
  );
  console.error('Set PYTHON or PYTHON3 to a python3 executable and retry.');
  process.exit(1);
};

const probeSkillsRef = () => {
  if (!existsSync(skillsRefBin) || !existsSync(venvPython)) {
    return false;
  }
  const pythonProbe = spawnSync(venvPython, ['--version'], { encoding: 'utf8' });
  if (pythonProbe.status !== 0 || pythonProbe.error) {
    return false;
  }
  const skillsRefProbe = spawnSync(skillsRefBin, ['validate', '--help'], { encoding: 'utf8' });
  return skillsRefProbe.status === 0 && !skillsRefProbe.error;
};

const ensureSkillsRef = () => {
  if (probeSkillsRef()) {
    return;
  }

  if (existsSync(venvDir)) {
    console.log(`[validate-skill-format] Removing stale venv at ${venvDir}`);
    rmSync(venvDir, { recursive: true, force: true });
  }

  const systemPython = resolveSystemPython();
  console.log(`[validate-skill-format] Creating venv at ${venvDir}`);
  run(systemPython, ['-m', 'venv', venvDir]);
  console.log(
    `[validate-skill-format] Installing skills-ref@${SKILLS_REF_GIT_REF.slice(0, 7)}`,
  );
  run(venvPython, ['-m', 'pip', 'install', '-q', SKILLS_REF_INSTALL]);
};

const main = () => {
  if (process.env.SKILLS_REF_SKIP === '1') {
    console.log('[validate-skill-format] SKILLS_REF_SKIP=1 — skipping agentskills.io validation.');
    return;
  }

  ensureSkillsRef();

  let failed = false;
  for (const skillDir of skillDirs) {
    const result = spawnSync(skillsRefBin, ['validate', skillDir], {
      encoding: 'utf8',
    });
    if (result.stdout) {
      process.stdout.write(result.stdout);
    }
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }
    if (result.status !== 0) {
      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  }

  console.log(
    `[validate-skill-format] OK — ${skillDirs.length} skill directories conform to agentskills.io`,
  );
};

main();
