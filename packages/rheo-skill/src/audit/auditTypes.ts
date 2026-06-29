export type AuditKind =
  | 'region'
  | 'style'
  | 'background'
  | 'asset'
  | 'lottie'
  | 'stack'
  | 'carousel'
  | 'layout'
  | 'font'
  | 'choice'
  | 'animation'
  | 'i18n'
  | 'question';

export type AuditConfidence = 'high' | 'medium' | 'low';

export type AuditFinding = {
  kind: AuditKind;
  confidence: AuditConfidence;
  file: string;
  evidence: string;
  recommendation: string;
};

export type AuditFile = {
  path: string;
  absolutePath: string;
  content: string | null;
};

export type AuditOptions = {
  root: string;
  /** @deprecated Prefer `entries`. */
  entry?: string;
  entries?: string[];
  out?: string;
  maxFiles: number;
  screenshots?: string;
  suggestAnimations?: string;
};

export type AuditReport = {
  root: string;
  /** Comma-joined entry paths for display. */
  entry?: string;
  entries?: string[];
  screenshots?: string;
  scannedFiles: number;
  inventoryFiles?: number;
  scopeMode?: 'import-graph' | 'directory' | 'mixed' | 'full-root';
  findings: AuditFinding[];
  animationSuggestions?: import('./animationSuggestionTypes.js').AnimationScreenSuggestion[];
};
