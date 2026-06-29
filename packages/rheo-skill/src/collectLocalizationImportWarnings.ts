import type { FlowManifest } from '@getrheo/contracts/manifest';
import type { Layer } from '@getrheo/contracts/layers';
import { walkScreen } from '@getrheo/flow-runtime/layers';
import type { ManifestValidationIssue } from '@getrheo/flow-runtime';
import { looksLikeI18nKey } from './audit/i18nKeyHeuristics.js';

type LocalizedField = { path: string[]; defaultValue: string };

const localizedFieldsFromLayer = (layer: Layer, basePath: string[]): LocalizedField[] => {
  const fields: LocalizedField[] = [];
  const push = (suffix: string[], value: string | undefined) => {
    if (!value?.trim() || !looksLikeI18nKey(value)) return;
    fields.push({ path: [...basePath, ...suffix], defaultValue: value.trim() });
  };

  // hyperlink/button/back_button label copy lives in nested `text` children,
  // which walkScreen visits as their own `text` layers and are caught above.
  if (layer.kind === 'text') push(['text', 'default'], layer.text?.default);
  if (layer.kind === 'text_input') push(['placeholder', 'default'], layer.placeholder?.default);
  if (layer.kind === 'scale_input') {
    push(['minLabel', 'default'], layer.minLabel?.default);
    push(['maxLabel', 'default'], layer.maxLabel?.default);
  }
  if (layer.kind === 'oauth_provider' && 'label' in layer && layer.label) {
    push(['label', 'default'], layer.label.default);
  }

  return fields;
};

/** Warn when manifest copy looks like i18n keys instead of resolved default-locale strings. */
export const collectLocalizationImportWarnings = (manifest: FlowManifest): ManifestValidationIssue[] => {
  const issues: ManifestValidationIssue[] = [];

  manifest.screens.forEach((screen, screenIndex) => {
    walkScreen(screen, (layer) => {
      const layerPath = ['screens', String(screenIndex), layer.id ?? layer.kind];
      const fields = localizedFieldsFromLayer(layer, layerPath);
      fields.forEach((field) => {
        issues.push({
          path: field.path,
          message: `text.default looks like an i18n key ("${field.defaultValue}"), not user-facing copy. Resolve the app default locale (${manifest.defaultLocale}) string from translation files and set text.default to that value. See localization-import.md.`,
          code: 'manifest_i18n_key_in_default',
          stepId: screen.id ?? null,
        });
      });
    });
  });

  return issues;
};
