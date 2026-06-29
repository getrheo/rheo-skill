import { describe, expect, it, vi } from 'vitest';
import { extractManifestProfileVersion, fetchManifestProfile } from '../src/fetchManifestProfile';

describe('fetchManifestProfile', () => {
  it('extracts profile version from markdown', () => {
    expect(extractManifestProfileVersion('# Profile\n\nProfile version: 2026-05-22\n')).toBe(
      '2026-05-22',
    );
  });

  it('falls back to bundled guidance when fetch fails', async () => {
    const originalFetch = globalThis.fetch;
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('blocked'))),
    );

    const profile = await fetchManifestProfile({ url: 'https://example.invalid/profile' });

    expect(profile.source).toBe('fallback');
    expect(profile.version).toBe('bundled-0.1.0');
    vi.stubGlobal('fetch', originalFetch);
  });
});
