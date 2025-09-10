interface RGB {
    r: number;
    g: number;
    b: number;
}
interface Lab {
    l: number;
    a: number;
    b: number;
}
declare const hexToRgb: (hex: string) => RGB;
declare const rgbToXyz: ({ r, g, b }: RGB) => [number, number, number];
declare const xyzToLab: (xyz: [number, number, number]) => Lab;
declare const rgbToLab: (rgb: RGB) => Lab;

/**
 * Calculates the CIE76 color difference between two Lab colors.
 * This is the most basic delta-E formula, based on Euclidean distance.
 * @param lab1 - The first Lab color object.
 * @param lab2 - The second Lab color object.
 * @returns The CIE76 delta-E value.
 */
declare const deltaE76: (lab1: Lab, lab2: Lab) => number;
interface DeltaE94Options {
    kL?: number;
    K1?: number;
    K2?: number;
}
/**
 * Calculates the CIE94 color difference between two Lab colors.
 * It provides more perceptually uniform results than CIE76 by introducing
 * application-specific weighting factors.
 *
 * The implementation defaults to "graphic arts" standards.
 * For "textiles", use: `{ kL: 2, K1: 0.048, K2: 0.014 }`
 * @param lab1 - The first Lab color object.
 * @param lab2 - The second Lab color object.
 * @param options - Optional weighting factors for kL, K1, and K2.
 * @returns The CIE94 delta-E value.
 */
declare const deltaE94: (lab1: Lab, lab2: Lab, options?: DeltaE94Options) => number;
/**
 * Calculates the CIEDE2000 color difference between two Lab colors.
 * This is the most accurate and complex formula, providing the best
 * correlation with human perception. It is recommended for most applications.
 * @param lab1 - The first Lab color object.
 * @param lab2 - The second Lab color object.
 * @returns The CIEDE2000 delta-E value.
 */
declare const deltaE2000: (lab1: Lab, lab2: Lab) => number;

interface Color {
    hex: string;
    name: string;
}
interface ColorWithLab extends Color {
    lab: Lab;
}
declare const ColorList: Color[];
/**
 * A list of colors with their Lab values pre-calculated.
 * The calculation is memoized for performance.
 */
declare function getColorListWithLab(): ColorWithLab[];

interface ColorMatch extends Color {
    distance: number;
}
interface FindNearestColorOptions {
    formula?: "76" | "94" | "2000";
    colorList?: readonly ColorWithLab[];
}
declare const findNearestColor: (inputHex: string, options?: FindNearestColorOptions) => ColorMatch | null;

/**
 * Normalize and validate a HEX string.
 * Ensures:
 *  - Leading "#" is present
 *  - Exactly 6 hex digits (strips alpha channel if present)
 * Throws if invalid.
 */
declare const normalizeHex: (hex: string) => string;

export { type Color, ColorList, type ColorMatch, type ColorWithLab, type FindNearestColorOptions, type Lab, type RGB, deltaE2000, deltaE76, deltaE94, findNearestColor, getColorListWithLab, hexToRgb, normalizeHex, rgbToLab, rgbToXyz, xyzToLab };
