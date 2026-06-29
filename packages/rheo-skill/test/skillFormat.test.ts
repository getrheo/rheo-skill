import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const scriptPath = resolve(__dirname, '../scripts/validate-skill-format.mjs');

describe('agentskills.io SKILL.md format', () => {
  it('passes skills-ref validate on all shipped skill directories', () => {
    if (process.env.SKILLS_REF_SKIP === '1') {
      return;
    }

    const result = spawnSync(process.execPath, [scriptPath], {
      encoding: 'utf8',
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const output = [result.stdout, result.stderr].filter(Boolean).join('\n');
    expect(result.status, output || 'validate-skill-format failed').toBe(0);
    expect(output).toContain('skill directories conform to agentskills.io');
  }, 120_000);
});
