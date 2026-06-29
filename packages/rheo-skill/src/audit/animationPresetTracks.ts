import type { AnimationClip } from '@getrheo/contracts';

/** Mirror of builder mount/unmount presets — keep in sync with `animationClipPresets/presets.ts`. */
export type AnimationPresetDef = {
  id: string;
  optionalFade?: boolean;
  build: (opts?: { withFade?: boolean }) => Pick<AnimationClip, 'tracks'>;
};

const fadeInTracks: AnimationClip['tracks'] = [
  {
    property: 'opacity',
    keyframes: [
      { t: 0, value: 0, easing: 'standard' },
      { t: 1, value: 1 },
    ],
  },
];

export const ANIMATION_PRESETS: Record<string, AnimationPresetDef> = {
  'fade-in': {
    id: 'fade-in',
    build: () => ({ tracks: fadeInTracks }),
  },
  'slide-up': {
    id: 'slide-up',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateY',
          keyframes: [
            { t: 0, value: 16, easing: 'standard' },
            { t: 1, value: 0 },
          ],
        },
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0]!, ...translate] } : { tracks: translate };
    },
  },
  'slide-down-in': {
    id: 'slide-down-in',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateY',
          keyframes: [
            { t: 0, value: -16, easing: 'standard' },
            { t: 1, value: 0 },
          ],
        },
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0]!, ...translate] } : { tracks: translate };
    },
  },
  'slide-in-left': {
    id: 'slide-in-left',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateX',
          keyframes: [
            { t: 0, value: -24, easing: 'standard' },
            { t: 1, value: 0 },
          ],
        },
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0]!, ...translate] } : { tracks: translate };
    },
  },
  'slide-in-right': {
    id: 'slide-in-right',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateX',
          keyframes: [
            { t: 0, value: 24, easing: 'standard' },
            { t: 1, value: 0 },
          ],
        },
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0]!, ...translate] } : { tracks: translate };
    },
  },
  'scale-in': {
    id: 'scale-in',
    build: () => ({
      tracks: [
        ...fadeInTracks,
        {
          property: 'scale',
          keyframes: [
            { t: 0, value: 0.96, easing: 'emphasized' },
            { t: 1, value: 1 },
          ],
        },
      ],
    }),
  },
  'fade-out': {
    id: 'fade-out',
    build: () => ({
      tracks: [
        {
          property: 'opacity',
          keyframes: [
            { t: 0, value: 1, easing: 'standard' },
            { t: 1, value: 0 },
          ],
        },
      ],
    }),
  },
  'slide-up-out': {
    id: 'slide-up-out',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateY',
          keyframes: [
            { t: 0, value: 0, easing: 'standard' },
            { t: 1, value: -20 },
          ],
        },
      ];
      const fadeOut = ANIMATION_PRESETS['fade-out']!.build().tracks[0]!;
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    },
  },
  'slide-down-out': {
    id: 'slide-down-out',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateY',
          keyframes: [
            { t: 0, value: 0, easing: 'standard' },
            { t: 1, value: 20 },
          ],
        },
      ];
      const fadeOut = ANIMATION_PRESETS['fade-out']!.build().tracks[0]!;
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    },
  },
  'slide-left-out': {
    id: 'slide-left-out',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateX',
          keyframes: [
            { t: 0, value: 0, easing: 'standard' },
            { t: 1, value: -24 },
          ],
        },
      ];
      const fadeOut = ANIMATION_PRESETS['fade-out']!.build().tracks[0]!;
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    },
  },
  'slide-right-out': {
    id: 'slide-right-out',
    optionalFade: true,
    build: (opts) => {
      const translate: AnimationClip['tracks'] = [
        {
          property: 'translateX',
          keyframes: [
            { t: 0, value: 0, easing: 'standard' },
            { t: 1, value: 24 },
          ],
        },
      ];
      const fadeOut = ANIMATION_PRESETS['fade-out']!.build().tracks[0]!;
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    },
  },
  'scale-out': {
    id: 'scale-out',
    build: () => ({
      tracks: [
        {
          property: 'opacity',
          keyframes: [
            { t: 0, value: 1, easing: 'standard' },
            { t: 1, value: 0 },
          ],
        },
        {
          property: 'scale',
          keyframes: [
            { t: 0, value: 1, easing: 'emphasized' },
            { t: 1, value: 0.96 },
          ],
        },
      ],
    }),
  },
};

export const DEFAULT_MOUNT_DURATION_MS = 320;
export const DEFAULT_UNMOUNT_DURATION_MS = 280;
export const DEFAULT_STAGGER_STEP_MS = 50;

export const buildClipFromPreset = (opts: {
  presetId: string;
  targetLayerId: string;
  trigger: 'mount' | 'stagger' | 'unmount';
  staggerIndex?: number;
  durationMs?: number;
  delayMs?: number;
  withFade?: boolean;
}): AnimationClip | null => {
  const preset = ANIMATION_PRESETS[opts.presetId];
  if (!preset) return null;
  const built = preset.optionalFade ? preset.build({ withFade: opts.withFade }) : preset.build();
  const durationMs =
    opts.durationMs ??
    (opts.trigger === 'unmount' ? DEFAULT_UNMOUNT_DURATION_MS : DEFAULT_MOUNT_DURATION_MS);
  const slug = opts.targetLayerId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 32);
  return {
    id: `clip-${opts.presetId}-${slug}`,
    targetLayerId: opts.targetLayerId,
    trigger: opts.trigger,
    ...(opts.trigger === 'stagger' && opts.staggerIndex !== undefined
      ? { staggerIndex: opts.staggerIndex }
      : {}),
    durationMs,
    ...(opts.delayMs !== undefined ? { delayMs: opts.delayMs } : {}),
    tracks: built.tracks,
  };
};
