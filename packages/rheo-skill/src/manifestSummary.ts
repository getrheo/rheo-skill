import type { FlowManifest, Layer } from '@getrheo/contracts';

export type ManifestSummary = {
  screenCount: number;
  layerCount: number;
  layerKinds: string[];
  decisionNodeCount: number;
  externalSurfaceCount: number;
  externalSurfaceProviderTypes: string[];
  sdkAttributeKeyCount: number;
};

const walkLayer = (layer: Layer, visit: (layer: Layer) => void): void => {
  visit(layer);
  const children = 'children' in layer && Array.isArray(layer.children) ? layer.children : [];
  children.forEach((child) => walkLayer(child, visit));
};

export const summarizeManifest = (manifest: FlowManifest): ManifestSummary => {
  const layerKinds = new Set<string>();
  let layerCount = 0;

  manifest.screens.forEach((screen) => {
    Object.values(screen.regions).forEach((region) => {
      if (!region) return;
      walkLayer(region, (layer) => {
        layerCount += 1;
        layerKinds.add(layer.kind);
      });
    });
  });

  return {
    screenCount: manifest.screens.length,
    layerCount,
    layerKinds: [...layerKinds].sort(),
    decisionNodeCount: manifest.decisionNodes.length,
    externalSurfaceCount: manifest.externalSurfaceNodes.length,
    externalSurfaceProviderTypes: [
      ...new Set(manifest.externalSurfaceNodes.map((node) => node.config.provider)),
    ].sort(),
    sdkAttributeKeyCount: manifest.sdkAttributeKeys.length,
  };
};
