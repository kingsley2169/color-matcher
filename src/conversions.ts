import { normalizeHex } from "./utils/hex.js";  

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface Lab {
    l: number;
    a: number;
    b: number;
}

// HEX → RGB
export const hexToRgb = (hex: string): RGB => {
    const validHex = normalizeHex(hex).replace("#", "");
    const bigint = parseInt(validHex, 16);

    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
};

// RGB → XYZ
export const rgbToXyz = ({ r, g, b }: RGB): [number, number, number] => {
    const mapped = [r, g, b].map(v => {
        v /= 255;
        return v > 0.04045
            ? Math.pow((v + 0.055) / 1.055, 2.4)
            : v / 12.92;
    });
    const [nr, ng, nb] = mapped as [number, number, number];

    const x = nr * 0.4124564 + ng * 0.3575761 + nb * 0.1804375;
    const y = nr * 0.2126729 + ng * 0.7151522 + nb * 0.0721750;
    const z = nr * 0.0193339 + ng * 0.1191920 + nb * 0.9503041;

    return [x, y, z];
};

// XYZ → Lab
export const xyzToLab = (xyz: [number, number, number]): Lab => {
    const divisors = [0.95047, 1.0, 1.08883];
    const [x, y, z] = xyz.map((v, i) =>
        v / (divisors[i] !== undefined ? divisors[i]! : 1)
    ) as [number, number, number];

    const f = (t: number) =>
        t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116);

    const fx = f(x);
    const fy = f(y);
    const fz = f(z);

    return {
        l: (116 * fy) - 16,
        a: 500 * (fx - fy),
        b: 200 * (fy - fz),
    };
};

// RGB → Lab
export const rgbToLab = (rgb: RGB): Lab => xyzToLab(rgbToXyz(rgb));
