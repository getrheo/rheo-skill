export type RestingMotionPresetId = 'translate' | 'bounce' | 'scale' | 'pulse' | 'rotate';

export type AnimationClipSuggestion = {
  targetLayerId: string;
  trigger: 'mount' | 'stagger' | 'unmount';
  preset: string;
  staggerIndex?: number;
  durationMs?: number;
  delayMs?: number;
  withFade?: boolean;
};

export type RestingMotionSuggestion = {
  targetLayerId: string;
  preset: RestingMotionPresetId;
  loop?: boolean;
  durationMs?: number;
  cycleDurationMs?: number;
};

export type AnimationScreenSuggestion = {
  screenId: string;
  sourceFiles: string[];
  suggested: {
    stagger?: { stepMs: number };
    animations: AnimationClipSuggestion[];
    restingMotion: RestingMotionSuggestion[];
  };
  omitted: Array<{ reason: string; evidence: string }>;
};

export type AnimationAnalysisResult = {
  findings: import('./auditTypes.js').AuditFinding[];
  suggestions: AnimationScreenSuggestion[];
};
