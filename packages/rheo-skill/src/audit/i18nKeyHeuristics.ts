/** True when a string looks like an i18n key rather than user-facing copy. */
export const looksLikeI18nKey = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed.length < 3) return false;
  if (/\s/.test(trimmed)) return false;
  if (/^[\w-]+:[\w.-]+$/.test(trimmed)) return true;
  if (/^[A-Z][A-Z0-9_]{2,}$/.test(trimmed)) return true;
  if (/^[a-z][\w]*(\.[\w]+)+$/.test(trimmed)) return true;
  return false;
};
