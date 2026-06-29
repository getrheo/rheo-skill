import { createHash } from 'node:crypto';
import { dirname, normalize } from 'node:path';
import type { AuditFile, AuditFinding } from '../auditTypes.js';

const ASSET_REF_RE =
  /(?:from\s+['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|json|lottie|mp4|mov|webm|ttf|otf|woff2?))['"]|require\(\s*['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|json|lottie|mp4|mov|webm|ttf|otf|woff2?))['"]\s*\)|['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|json|lottie|mp4|mov|webm|ttf|otf|woff2?))['"])/gi;

const UNSUPPORTED_IMAGE_EXT = /\.(heic|heif|avif|bmp|ico|tiff?)$/i;

const inferType = (path: string): 'image' | 'lottie' | 'video' | 'font' => {
  const lower = path.toLowerCase();
  if (lower.endsWith('.ttf') || lower.endsWith('.otf') || lower.endsWith('.woff') || lower.endsWith('.woff2')) {
    return 'font';
  }
  if (lower.endsWith('.json') || lower.endsWith('.lottie')) return 'lottie';
  if (lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.webm')) return 'video';
  return 'image';
};

const inferContentType = (path: string): string | null => {
  const lower = path.toLowerCase();
  if (UNSUPPORTED_IMAGE_EXT.test(lower)) return null;
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.svg')) return 'image/svg+xml';
  if (lower.endsWith('.json') || lower.endsWith('.lottie')) return 'application/json';
  if (lower.endsWith('.mp4')) return 'video/mp4';
  if (lower.endsWith('.mov')) return 'video/quicktime';
  if (lower.endsWith('.webm')) return 'video/webm';
  if (lower.endsWith('.ttf')) return 'font/ttf';
  if (lower.endsWith('.otf')) return 'font/otf';
  if (lower.endsWith('.woff')) return 'font/woff';
  if (lower.endsWith('.woff2')) return 'font/woff2';
  return null;
};

const placeholderUuid = (path: string): string => {
  const hash = createHash('sha1').update(path).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-8${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
};

const resolveRef = (filePath: string, ref: string): string =>
  normalize(ref.startsWith('.') ? `${dirname(filePath)}/${ref}` : ref).replaceAll('\\', '/');

export const analyzeAssets = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];
  const seen = new Set<string>();

  files.forEach((file) => {
    if (!file.content) return;
    for (const match of file.content.matchAll(ASSET_REF_RE)) {
      const ref = match[1] ?? match[2] ?? match[3];
      if (!ref) continue;
      const assetPath = resolveRef(file.path, ref);
      const key = `${file.path}:${assetPath}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const type = inferType(assetPath);
      const contentType = inferContentType(assetPath);
      if (contentType === null) {
        findings.push({
          kind: 'asset',
          confidence: 'high',
          file: file.path,
          evidence: `${ref} -> ${assetPath}`,
          recommendation: `BLOCKING: Rheo accepts PNG, JPEG, WebP, GIF, or SVG for images (not HEIC/AVIF). Convert ${assetPath} before bundling, or use a supported format in rheo-import.assets.json.`,
        });
        continue;
      }
      findings.push({
        kind: type === 'lottie' ? 'lottie' : type === 'font' ? 'font' : 'asset',
        confidence: 'high',
        file: file.path,
        evidence: `${ref} -> ${assetPath}`,
        recommendation:
          type === 'font'
            ? `BLOCKING: Do not add ${assetPath} to rheo-import.assets.json (fonts are not media). Copy to assets/fonts/, add a style row in rheo-import.fonts.json (placeholder id ${placeholderUuid(assetPath)}, weight/italic), set manifest.theme.fontFamily. Upload MIME is inferred from extension (font/ttf, font/otf, font/woff, font/woff2). See font-import.md.`
            : `Bundle as ${type} with contentType "${contentType}", placeholder id ${placeholderUuid(assetPath)}, and include it in rheo-import.assets.json. Allowed image MIME types: image/png, image/jpeg, image/webp, image/gif, image/svg+xml. Never put .ttf/.otf/.woff/.woff2 in assets.json.`,
      });
    }
  });

  if (findings.length === 0) {
    findings.push({
      kind: 'question',
      confidence: 'medium',
      file: '(asset audit)',
      evidence: 'No local image, Lottie, or video references were found in scanned files.',
      recommendation: 'Only use JSON-only output if the traced flow truly has no local media assets.',
    });
  }

  return findings;
};
