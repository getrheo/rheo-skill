import type { FlowManifest } from '@getrheo/contracts/manifest';
import type { Screen } from '@getrheo/contracts/screens';
import type { AnimationClip } from '@getrheo/contracts';
import { walkScreen, type ManifestValidationIssue } from '@getrheo/flow-runtime';

const layerIdsOnScreen = (screen: Screen): Set<string> => {
  const ids = new Set<string>();
  walkScreen(screen, (l) => {
    ids.add(l.id);
  });
  return ids;
};

export const collectAnimationImportWarnings = (manifest: FlowManifest): ManifestValidationIssue[] => {
  const issues: ManifestValidationIssue[] = [];

  manifest.screens.forEach((screen, screenIndex) => {
    const layerIds = layerIdsOnScreen(screen);
    const animations = (screen as { animations?: AnimationClip[] }).animations;
    if (!animations?.length) return;

    animations.forEach((clip, clipIndex) => {
      const basePath = ['screens', screenIndex, 'animations', clipIndex] as const;

      if (!layerIds.has(clip.targetLayerId)) {
        issues.push({
          path: [...basePath, 'targetLayerId'],
          message: `Animation clip "${clip.id}" targets missing layer "${clip.targetLayerId}" on screen "${screen.id}".`,
          code: 'animation_target_layer_missing',
          stepId: screen.id,
        });
      }

      if (clip.trigger === 'stagger' && clip.staggerIndex === undefined) {
        issues.push({
          path: [...basePath, 'staggerIndex'],
          message: `Clip "${clip.id}" uses trigger "stagger" but omits staggerIndex.`,
          code: 'animation_stagger_index_required',
          stepId: screen.id,
        });
      }

      if (clip.trigger === 'unmount' && clip.staggerIndex !== undefined) {
        issues.push({
          path: [...basePath, 'staggerIndex'],
          message: `Clip "${clip.id}" with trigger "unmount" must not set staggerIndex.`,
          code: 'animation_unmount_stagger_forbidden',
          stepId: screen.id,
        });
      }

      if (clip.durationMs < 50 || clip.durationMs > 800) {
        issues.push({
          path: [...basePath, 'durationMs'],
          message: `Clip "${clip.id}" durationMs=${clip.durationMs} is outside the recommended 50–800ms import range.`,
          code: 'animation_duration_out_of_range',
          stepId: screen.id,
        });
      }
    });
  });

  return issues;
};
