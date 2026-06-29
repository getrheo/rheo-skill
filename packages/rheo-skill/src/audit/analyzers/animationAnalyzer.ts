import type { AuditFile, AuditFinding } from '../auditTypes.js';
import {
  buildClipFromPreset,
  DEFAULT_MOUNT_DURATION_MS,
  DEFAULT_STAGGER_STEP_MS,
  DEFAULT_UNMOUNT_DURATION_MS,
} from '../animationPresetTracks.js';
import type {
  AnimationAnalysisResult,
  AnimationClipSuggestion,
  AnimationScreenSuggestion,
  RestingMotionSuggestion,
} from '../animationSuggestionTypes.js';

const MAX_CLIPS_PER_SCREEN = 12;

const screenSlugFromPath = (filePath: string): string => {
  const base = filePath.split('/').pop() ?? filePath;
  const name = base.replace(/\.(tsx|ts|jsx|js|swift)$/i, '');
  return name
    .replace(/Screen$/i, '')
    .replace(/View$/i, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'screen';
};

const layerHint = (screenSlug: string, role: string): string => `layer:${screenSlug}:${role}`;

const clampDurationMs = (raw: number | undefined, fallback: number): number | undefined => {
  if (raw === undefined || !Number.isFinite(raw)) return fallback;
  const n = Math.round(raw);
  if (n < 50 || n > 800) return fallback;
  return n;
};

const extractDurationMs = (content: string, nearIndex: number): number | undefined => {
  const window = content.slice(Math.max(0, nearIndex - 200), nearIndex + 400);
  const patterns = [
    /\bduration\s*:\s*(\d+)/i,
    /\bdurationMs\s*:\s*(\d+)/i,
    /\b(\d{2,4})\s*,\s*(?:easing|useNativeDriver)/i,
  ];
  for (const re of patterns) {
    const m = window.match(re);
    if (m?.[1]) {
      const n = Number.parseInt(m[1], 10);
      if (n >= 50 && n <= 800) return n;
    }
  }
  return undefined;
};

const extractStaggerStepMs = (content: string): number | undefined => {
  const m =
    content.match(/\bstagger\s*:\s*(\d+)/i) ??
    content.match(/\bstaggerDelay\s*:\s*(\d+)/i) ??
    content.match(/\bstepMs\s*:\s*(\d+)/i);
  if (!m?.[1]) return undefined;
  const n = Number.parseInt(m[1], 10);
  return n >= 20 && n <= 500 ? n : undefined;
};

const countExplicitStaggerChildren = (content: string): number | null => {
  if (!/\bstaggerChildren\b|\bstagger:\s*\d+/i.test(content)) return null;
  const delayArray = content.match(/\bdelays\s*=\s*\[([^\]]+)\]/);
  if (delayArray?.[1]) {
    return delayArray[1].split(',').filter((s) => s.trim().length > 0).length;
  }
  const mapDelay = content.match(/\.map\s*\([^)]*,\s*(?:index|i)\s*\)\s*=>[\s\S]{0,120}\bdelay(?:Ms)?\s*:\s*(?:index|i)\s*\*\s*(\d+)/);
  if (mapDelay) {
    const childBlocks = content.match(/\bchildren\s*=\s*\{[\s\S]{0,800}\}/g);
    if (childBlocks?.[0]) {
      const items = childBlocks[0].match(/<[\w.]+/g);
      if (items && items.length > 1) return Math.min(items.length - 1, 8);
    }
    return 3;
  }
  return null;
};

type DetectedMotion = {
  preset: string;
  trigger: 'mount' | 'stagger' | 'unmount';
  role: string;
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
  durationMs?: number;
  staggerIndex?: number;
  withFade?: boolean;
  unmapped?: boolean;
  unmappedReason?: string;
};

const analyzeRnContent = (content: string, file: string, screenSlug: string): DetectedMotion[] => {
  const motions: DetectedMotion[] = [];

  if (/\bwithSpring\s*\(/i.test(content)) {
    motions.push({
      preset: '',
      trigger: 'mount',
      role: 'hero',
      confidence: 'high',
      evidence: 'withSpring(...)',
      unmapped: true,
      unmappedReason: 'spring physics cannot map to Rheo preset tracks',
    });
  }

  const reanimatedEnter = [
    [/FadeIn\.(down|up|left|right)?/i, (m: RegExpMatchArray) => {
      const dir = (m[1] ?? '').toLowerCase();
      if (dir === 'up') return 'slide-up';
      if (dir === 'down') return 'slide-down-in';
      if (dir === 'left') return 'slide-in-left';
      if (dir === 'right') return 'slide-in-right';
      return 'fade-in';
    }],
    [/SlideIn(Up|Down|Left|Right)/i, (m: RegExpMatchArray) => {
      const d = m[1]?.toLowerCase();
      if (d === 'up') return 'slide-up';
      if (d === 'down') return 'slide-down-in';
      if (d === 'left') return 'slide-in-left';
      return 'slide-in-right';
    }],
    [/ZoomIn/i, () => 'scale-in'],
  ] as const;

  for (const [re, pick] of reanimatedEnter) {
    const m = content.match(re);
    if (m) {
      motions.push({
        preset: pick(m),
        trigger: 'mount',
        role: 'hero',
        confidence: 'high',
        evidence: m[0],
        durationMs: extractDurationMs(content, m.index ?? 0),
      });
      break;
    }
  }

  const reanimatedExit = [
    [/FadeOut\.(down|up|left|right)?/i, (m: RegExpMatchArray) => {
      const dir = (m[1] ?? '').toLowerCase();
      if (dir === 'up') return 'slide-up-out';
      if (dir === 'down') return 'slide-down-out';
      if (dir === 'left') return 'slide-left-out';
      if (dir === 'right') return 'slide-right-out';
      return 'fade-out';
    }],
    [/SlideOut(Up|Down|Left|Right)/i, (m: RegExpMatchArray) => {
      const d = m[1]?.toLowerCase();
      if (d === 'up') return 'slide-up-out';
      if (d === 'down') return 'slide-down-out';
      if (d === 'left') return 'slide-left-out';
      return 'slide-right-out';
    }],
  ] as const;

  for (const [re, pick] of reanimatedExit) {
    const m = content.match(re);
    if (m) {
      motions.push({
        preset: pick(m),
        trigger: 'unmount',
        role: 'hero',
        confidence: 'high',
        evidence: m[0],
        durationMs: extractDurationMs(content, m.index ?? 0),
      });
      break;
    }
  }

  if (/\buseAnimatedStyle\b/i.test(content) || /\bAnimated\.timing\b/i.test(content)) {
    if (/translateY[\s\S]{0,80}(?:16|20|-16)/.test(content) && !motions.some((x) => x.preset === 'slide-up')) {
      motions.push({
        preset: 'slide-up',
        trigger: 'mount',
        role: 'hero',
        confidence: 'medium',
        evidence: 'translateY motion in animated style',
        durationMs: extractDurationMs(content, content.search(/translateY/i)),
      });
    } else if (/opacity[\s\S]{0,60}(?:0\s*[,}]|from:\s*0)/i.test(content) && !motions.some((x) => x.preset === 'fade-in')) {
      motions.push({
        preset: 'fade-in',
        trigger: 'mount',
        role: 'hero',
        confidence: 'medium',
        evidence: 'opacity fade in animated style',
        durationMs: extractDurationMs(content, content.search(/opacity/i)),
      });
    }
  }

  if (/\bLayoutAnimation\.configureNext\b/i.test(content)) {
    motions.push({
      preset: 'fade-in',
      trigger: 'mount',
      role: 'body',
      confidence: 'low',
      evidence: 'LayoutAnimation.configureNext',
      durationMs: DEFAULT_MOUNT_DURATION_MS,
    });
  }

  const staggerCount = countExplicitStaggerChildren(content);
  if (staggerCount !== null && staggerCount > 0) {
    const preset =
      motions.find((x) => x.trigger === 'mount' && !x.unmapped)?.preset ?? 'fade-in';
    for (let i = 0; i < staggerCount; i += 1) {
      motions.push({
        preset,
        trigger: 'stagger',
        role: `child-${i}`,
        confidence: 'high',
        evidence: `explicit stagger child index ${i}`,
        staggerIndex: i,
        durationMs: extractDurationMs(content, content.search(/stagger/i)),
      });
    }
  }

  if (/\brepeatForever\b|\blooping\s*:\s*true\b/i.test(content)) {
    if (/\brotate\b|rotation/i.test(content)) {
      motions.push({
        preset: 'rotate',
        trigger: 'mount',
        role: 'hero',
        confidence: 'high',
        evidence: 'repeatForever rotation',
      } as DetectedMotion & { resting?: true });
    } else if (/\bbounce|translateY/i.test(content)) {
      motions.push({
        preset: 'bounce',
        trigger: 'mount',
        role: 'cta',
        confidence: 'medium',
        evidence: 'repeatForever vertical motion',
      } as DetectedMotion & { resting?: true });
    } else if (/\bpulse|opacity/i.test(content)) {
      motions.push({
        preset: 'pulse',
        trigger: 'mount',
        role: 'hero',
        confidence: 'medium',
        evidence: 'repeatForever opacity',
      } as DetectedMotion & { resting?: true });
    }
  }

  if (motions.length === 0 && /\bwithTiming\s*\(/i.test(content)) {
    motions.push({
      preset: 'fade-in',
      trigger: 'mount',
      role: 'hero',
      confidence: 'low',
      evidence: 'withTiming (preset shape unclear)',
      durationMs: extractDurationMs(content, content.search(/withTiming/i)),
    });
  }

  void file;
  void screenSlug;
  return motions;
};

const analyzeSwiftContent = (content: string): DetectedMotion[] => {
  const motions: DetectedMotion[] = [];

  const transitionOpacity = content.match(/\.transition\s*\(\s*\.opacity\s*\)/i);
  if (transitionOpacity) {
    motions.push({
      preset: 'fade-in',
      trigger: 'mount',
      role: 'hero',
      confidence: 'high',
      evidence: transitionOpacity[0],
    });
  }

  const moveEdge = content.match(/\.transition\s*\(\s*\.move\s*\(\s*edge\s*:\s*\.(\w+)/i);
  if (moveEdge) {
    const edge = moveEdge[1]?.toLowerCase();
    const preset =
      edge === 'top' ? 'slide-down-in'
      : edge === 'bottom' ? 'slide-up'
      : edge === 'leading' ? 'slide-in-left'
      : edge === 'trailing' ? 'slide-in-right'
      : 'fade-in';
    motions.push({
      preset,
      trigger: 'mount',
      role: 'hero',
      confidence: 'high',
      evidence: moveEdge[0],
    });
  }

  if (/\.transition\s*\(\s*\.scale/i.test(content)) {
    motions.push({
      preset: 'scale-in',
      trigger: 'mount',
      role: 'hero',
      confidence: 'high',
      evidence: '.transition(.scale)',
    });
  }

  if (/\.animation\s*\(\s*\.repeatForever/i.test(content)) {
    if (/\.rotateEffect|rotationEffect/i.test(content)) {
      motions.push({
        preset: 'rotate',
        trigger: 'mount',
        role: 'hero',
        confidence: 'high',
        evidence: 'animation(.repeatForever) + rotation',
      } as DetectedMotion & { resting?: true });
    } else {
      motions.push({
        preset: 'pulse',
        trigger: 'mount',
        role: 'hero',
        confidence: 'medium',
        evidence: 'animation(.repeatForever)',
      } as DetectedMotion & { resting?: true });
    }
  }

  if (/\bwithAnimation\s*\(/i.test(content) && motions.length === 0) {
    motions.push({
      preset: 'fade-in',
      trigger: 'mount',
      role: 'hero',
      confidence: 'medium',
      evidence: 'withAnimation { ... }',
    });
  }

  return motions;
};

const isRestingPreset = (preset: string): preset is 'translate' | 'bounce' | 'scale' | 'pulse' | 'rotate' =>
  preset === 'translate' || preset === 'bounce' || preset === 'scale' || preset === 'pulse' || preset === 'rotate';

const motionToFinding = (
  file: string,
  screenSlug: string,
  motion: DetectedMotion,
): AuditFinding => {
  if (motion.unmapped) {
    return {
      kind: 'animation',
      confidence: motion.confidence,
      file,
      evidence: motion.evidence,
      recommendation: `Unmapped — omit from manifest. ${motion.unmappedReason ?? 'No matching Rheo preset.'}`,
    };
  }

  const target = layerHint(screenSlug, motion.role);
  const trigger = motion.trigger;
  const preset = motion.preset;
  const dur =
    motion.durationMs !== undefined
      ? ` durationMs=${motion.durationMs}`
      : '';
  const stagger =
    motion.staggerIndex !== undefined ? ` staggerIndex=${motion.staggerIndex}` : '';

  return {
    kind: 'animation',
    confidence: motion.confidence,
    file,
    evidence: motion.evidence,
    recommendation: `Map to preset \`${preset}\` trigger=\`${trigger}\` targetLayerId=\`${target}\`${stagger}${dur}. Resolve targetLayerId to a real layer id in the manifest.`,
  };
};

const buildScreenSuggestion = (
  screenSlug: string,
  file: string,
  motions: DetectedMotion[],
  content: string,
): AnimationScreenSuggestion => {
  const animations: AnimationClipSuggestion[] = [];
  const restingMotion: RestingMotionSuggestion[] = [];
  const omitted: Array<{ reason: string; evidence: string }> = [];

  let clipCount = 0;

  for (const motion of motions) {
    if (motion.unmapped) {
      omitted.push({
        reason: motion.unmappedReason ?? 'unmapped motion',
        evidence: motion.evidence,
      });
      continue;
    }

    if (isRestingPreset(motion.preset)) {
      if (motion.confidence === 'high') {
        restingMotion.push({
          targetLayerId: layerHint(screenSlug, motion.role),
          preset: motion.preset,
          loop: true,
        });
      }
      continue;
    }

    if (clipCount >= MAX_CLIPS_PER_SCREEN) continue;

    const trigger = motion.trigger;
    const durationMs = clampDurationMs(
      motion.durationMs,
      trigger === 'unmount' ? DEFAULT_UNMOUNT_DURATION_MS : DEFAULT_MOUNT_DURATION_MS,
    );

    animations.push({
      targetLayerId: layerHint(screenSlug, motion.role),
      trigger,
      preset: motion.preset,
      ...(motion.staggerIndex !== undefined ? { staggerIndex: motion.staggerIndex } : {}),
      durationMs,
      ...(motion.withFade ? { withFade: motion.withFade } : {}),
    });
    clipCount += 1;
  }

  const staggerStep = extractStaggerStepMs(content);
  const hasStagger = animations.some((a) => a.trigger === 'stagger');

  return {
    screenId: screenSlug,
    sourceFiles: [file],
    suggested: {
      ...(hasStagger ? { stagger: { stepMs: staggerStep ?? DEFAULT_STAGGER_STEP_MS } } : {}),
      animations,
      restingMotion,
    },
    omitted,
  };
};

export const analyzeAnimations = (files: AuditFile[]): AnimationAnalysisResult => {
  const findings: AuditFinding[] = [];
  const suggestions: AnimationScreenSuggestion[] = [];
  const screenFiles = files.filter(
    (f) =>
      f.content &&
      (/\.(tsx|ts|jsx|js)$/i.test(f.path) || /\.swift$/i.test(f.path)) &&
      !/node_modules|\.test\.|__tests__|\.spec\./i.test(f.path),
  );

  for (const file of screenFiles) {
    const content = file.content!;
    const screenSlug = screenSlugFromPath(file.path);
    const isSwift = /\.swift$/i.test(file.path);

    const motions = isSwift ? analyzeSwiftContent(content) : analyzeRnContent(content, file.path, screenSlug);

    if (motions.length === 0) continue;

    const mappedClips = motions.filter((m) => !m.unmapped && !isRestingPreset(m.preset));
    if (mappedClips.length > MAX_CLIPS_PER_SCREEN) {
      findings.push({
        kind: 'animation',
        confidence: 'medium',
        file: file.path,
        evidence: `${mappedClips.length} clip candidates on one screen`,
        recommendation: `More than ${MAX_CLIPS_PER_SCREEN} clips detected — prioritize hero and stagger children only.`,
      });
    }

    for (const motion of motions) {
      findings.push(motionToFinding(file.path, screenSlug, motion));
    }

    suggestions.push(buildScreenSuggestion(screenSlug, file.path, motions, content));
  }

  if (suggestions.length === 0 && screenFiles.length > 0) {
    findings.push({
      kind: 'animation',
      confidence: 'low',
      file: '(animation audit)',
      evidence: 'No Reanimated, Animated, LayoutAnimation, or SwiftUI motion markers in scoped files.',
      recommendation:
        'If the app animates screens, re-run audit with the correct entry path or confirm intake Q6=no to skip motion import.',
    });
  }

  return { findings, suggestions };
};

export const buildAnimationSuggestionsJson = (
  suggestions: AnimationScreenSuggestion[],
): { screens: AnimationScreenSuggestion[]; clips: ReturnType<typeof buildClipFromPreset>[] } => {
  const clips: ReturnType<typeof buildClipFromPreset>[] = [];
  for (const screen of suggestions) {
    for (const s of screen.suggested.animations) {
      const clip = buildClipFromPreset({
        presetId: s.preset,
        targetLayerId: s.targetLayerId,
        trigger: s.trigger,
        staggerIndex: s.staggerIndex,
        durationMs: s.durationMs,
        delayMs: s.delayMs,
        withFade: s.withFade,
      });
      if (clip) clips.push(clip);
    }
  }
  return { screens: suggestions, clips };
};
