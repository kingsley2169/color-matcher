import type { Lab } from "./conversions.js";

/**
 * Calculates the CIE76 color difference between two Lab colors.
 * This is the most basic delta-E formula, based on Euclidean distance.
 * @param lab1 - The first Lab color object.
 * @param lab2 - The second Lab color object.
 * @returns The CIE76 delta-E value.
 */
export const deltaE76 = (lab1: Lab, lab2: Lab): number =>
	Math.sqrt(
		Math.pow(lab1.l - lab2.l, 2) +
		Math.pow(lab1.a - lab2.a, 2) +
		Math.pow(lab1.b - lab2.b, 2)
	);

interface DeltaE94Options {
	kL?: number;
	K1?: number;
	K2?: number;
}

// Default weighting factors for "graphic arts"
const default94Options: Required<DeltaE94Options> = {
	kL: 1,
	K1: 0.045,
	K2: 0.015,
};

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
export const deltaE94 = (
	lab1: Lab,
	lab2: Lab,
	options: DeltaE94Options = {}
): number => {
	const { kL, K1, K2 } = { ...default94Options, ...options };
	const kC = 1;
	const kH = 1;

	const dL = lab1.l - lab2.l;
	const da = lab1.a - lab2.a;
	const db = lab1.b - lab2.b;

	const C1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
	const C2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
	const dC = C1 - C2;

	let dH = da * da + db * db - dC * dC;
	dH = dH < 0 ? 0 : Math.sqrt(dH);

	const SL = 1;
	const SC = 1 + K1 * C1;
	const SH = 1 + K2 * C1;

	return Math.sqrt(
		Math.pow(dL / (kL * SL), 2) +
		Math.pow(dC / (kC * SC), 2) +
		Math.pow(dH / (kH * SH), 2)
	);
};

const radToDeg = (rad: number): number => (rad * 180) / Math.PI;
const degToRad = (deg: number): number => (deg * Math.PI) / 180;

/**
 * Calculates the CIEDE2000 color difference between two Lab colors.
 * This is the most accurate and complex formula, providing the best
 * correlation with human perception. It is recommended for most applications.
 * @param lab1 - The first Lab color object.
 * @param lab2 - The second Lab color object.
 * @returns The CIEDE2000 delta-E value.
 */
export const deltaE2000 = (lab1: Lab, lab2: Lab): number => {
	const kL = 1, kC = 1, kH = 1;

	const L1 = lab1.l, a1 = lab1.a, b1 = lab1.b;
	const L2 = lab2.l, a2 = lab2.a, b2 = lab2.b;

	const C1 = Math.sqrt(a1 * a1 + b1 * b1);
	const C2 = Math.sqrt(a2 * a2 + b2 * b2);
	const C_bar = (C1 + C2) / 2;
	const G = 0.5 * (1 - Math.sqrt(Math.pow(C_bar, 7) / (Math.pow(C_bar, 7) + Math.pow(25, 7))));
	const a1_prime = (1 + G) * a1;
	const a2_prime = (1 + G) * a2;
	const C1_prime = Math.sqrt(a1_prime * a1_prime + b1 * b1);
	const C2_prime = Math.sqrt(a2_prime * a2_prime + b2 * b2);
	const C_bar_prime = (C1_prime + C2_prime) / 2;
	const dC_prime = C2_prime - C1_prime;
	let h1_prime = C1_prime === 0 ? 0 : radToDeg(Math.atan2(b1, a1_prime));
	if (h1_prime < 0) h1_prime += 360;
	let h2_prime = C2_prime === 0 ? 0 : radToDeg(Math.atan2(b2, a2_prime));
	if (h2_prime < 0) h2_prime += 360;
	const dh_prime = (C1_prime === 0 || C2_prime === 0) ? 0 : Math.abs(h1_prime - h2_prime) <= 180 ? h2_prime - h1_prime : (h2_prime <= h1_prime ? h2_prime - h1_prime + 360 : h2_prime - h1_prime - 360);
	const dH_prime = 2 * Math.sqrt(C1_prime * C2_prime) * Math.sin(degToRad(dh_prime / 2));
	const L_bar_prime = (L1 + L2) / 2;
	const dL_prime = L2 - L1;
	const SL = 1 + (0.015 * Math.pow(L_bar_prime - 50, 2)) / Math.sqrt(20 + Math.pow(L_bar_prime - 50, 2));
	const SC = 1 + 0.045 * C_bar_prime;
	const H_bar_prime = (C1_prime === 0 || C2_prime === 0) ? h1_prime + h2_prime : Math.abs(h1_prime - h2_prime) > 180 ? (h1_prime + h2_prime + 360) / 2 : (h1_prime + h2_prime) / 2;
	const T = 1 - 0.17 * Math.cos(degToRad(H_bar_prime - 30)) + 0.24 * Math.cos(degToRad(2 * H_bar_prime)) + 0.32 * Math.cos(degToRad(3 * H_bar_prime + 6)) - 0.20 * Math.cos(degToRad(4 * H_bar_prime - 63));
	const SH = 1 + 0.015 * C_bar_prime * T;
	const RT = -2 * Math.sqrt(Math.pow(C_bar_prime, 7) / (Math.pow(C_bar_prime, 7) + Math.pow(25, 7))) * Math.sin(degToRad(60 * Math.exp(-Math.pow((H_bar_prime - 275) / 25, 2))));

	return Math.sqrt(
		Math.pow(dL_prime / (kL * SL), 2) +
		Math.pow(dC_prime / (kC * SC), 2) +
		Math.pow(dH_prime / (kH * SH), 2) +
		RT * (dC_prime / (kC * SC)) * (dH_prime / (kH * SH))
	);
};
