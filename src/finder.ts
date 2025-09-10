import { getColorListWithLab } from "./colorsList.js";
import type { Color, ColorWithLab } from "./colorsList.js";
import { hexToRgb, rgbToLab } from "./conversions.js";
import type { Lab } from "./conversions.js";
import { deltaE76, deltaE94, deltaE2000 } from "./deltaE.js";
import { normalizeHex } from "./utils/hex.js";

export interface ColorMatch extends Color {
  distance: number;
}

export interface FindNearestColorOptions {
  formula?: "76" | "94" | "2000";
  colorList?: readonly ColorWithLab[];
}

const deltaEFormulas = {
  "76": deltaE76,
  "94": deltaE94,
  "2000": deltaE2000,
};

export const findNearestColor = (
  inputHex: string,
  options: FindNearestColorOptions = {}
): ColorMatch | null => {
  const { formula = "76", colorList } = options;
  let normalizedHex: string;
  try {
    normalizedHex = normalizeHex(inputHex);
  } catch {
    return null;
  }

  const list = colorList ?? getColorListWithLab();

  // Exact match first
  const exact = list.find((c) => c.hex === normalizedHex);
  if (exact) {
    return {
      name: exact.name,
      hex: exact.hex,
      distance: 0,
    };
  }

  let targetLab: Lab;
  try {
    targetLab = rgbToLab(hexToRgb(normalizedHex));
  } catch {
    return null;
  }

  let nearest: ColorWithLab | null = null;
  let minDiff = Infinity;

  const deltaE = deltaEFormulas[formula];

  for (const color of list) {
    const diff = deltaE(targetLab, color.lab);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = color;
    }
  }

  if (!nearest) {
    return null;
  }

  return {
    name: nearest.name,
    hex: nearest.hex,
    distance: minDiff,
  };
};