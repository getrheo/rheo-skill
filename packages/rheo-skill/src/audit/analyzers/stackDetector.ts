import type { AuditFile, AuditFinding } from '../auditTypes.js';

export const detectStack = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];
  const paths = new Set(files.map((file) => file.path));
  const allText = files.map((file) => file.content ?? '').join('\n');

  if (paths.has('app.json') || paths.has('app.config.ts') || allText.includes('expo-router')) {
    findings.push({
      kind: 'stack',
      confidence: 'high',
      file: 'package/app config',
      evidence: 'Expo or Expo Router markers found.',
      recommendation: 'Use the React Native / Expo implementation guidance.',
    });
  }
  if (allText.includes('nativewind') || paths.has('tailwind.config.js') || paths.has('tailwind.config.ts')) {
    findings.push({
      kind: 'stack',
      confidence: 'medium',
      file: 'tailwind/nativewind config',
      evidence: 'Tailwind or NativeWind markers found.',
      recommendation: 'Inspect Tailwind/NativeWind tokens before generating colors and spacing.',
    });
  }
  if (files.some((file) => file.path.endsWith('.swift'))) {
    findings.push({
      kind: 'stack',
      confidence: 'medium',
      file: '*.swift',
      evidence: 'Swift source files found.',
      recommendation: 'Use SwiftUI guidance when the entry point is a SwiftUI view or coordinator.',
    });
  }

  return findings;
};
