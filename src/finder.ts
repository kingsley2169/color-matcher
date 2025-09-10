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
  } catch (e) {
    throw new Error(`Invalid color format. Please provide a valid hex color.`);
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

  const targetLab: Lab = rgbToLab(hexToRgb(normalizedHex));

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

export interface FindAllClosestColorsOptions extends FindNearestColorOptions {
  /**
   * The number of closest colors to return. Defaults to 5.
   * This option is ignored if `threshold` is set.
   */
  count?: number;
  /**
   * The maximum distance for a color to be considered "close".
   * If set, this option takes precedence over `count`.
   */
  threshold?: number;
}

/**
 * Finds a list of the closest human-readable color names for a given hex color.
 *
 * @param inputHex The color to match, as a hex string (e.g., `#RRGGBB`).
 * @param options Options to control the matching logic.
 * @returns An array of `ColorMatch` objects, sorted by distance.
 */
export const findAllClosestColors = (
  inputHex: string,
  options: FindAllClosestColorsOptions = {}
): ColorMatch[] => {
  const { formula = "76", colorList, count = 5, threshold } = options;

  let normalizedHex: string;
  try {
    normalizedHex = normalizeHex(inputHex);
  } catch (e) {
    throw new Error(`Invalid color format. Please provide a valid hex color.`);
  }

  const list = colorList ?? getColorListWithLab();
  const deltaE = deltaEFormulas[formula];

  const targetLab = rgbToLab(hexToRgb(normalizedHex));

  const allMatches: ColorMatch[] = list.map((color) => ({
    name: color.name,
    hex: color.hex,
    distance: deltaE(targetLab, color.lab),
  }));

  allMatches.sort((a, b) => a.distance - b.distance);

  if (threshold !== undefined) {
    return allMatches.filter((match) => match.distance <= threshold);
  }

  return allMatches.slice(0, count);
};