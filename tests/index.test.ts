import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToLab } from "../src/conversions.js";
import { deltaE76 } from "../src/deltaE.js";
import { ColorList } from "../src/colorsList.js";
import { normalizeHex } from "../src/utils/hex.js";

const sampleColors = [
  { hex: "#FFEBCD", name: "Blanched Almond" },
  { hex: "#FFDAB9", name: "Peach Puff" },
  { hex: "#CD853F", name: "Peru" },
  { hex: "#FFC0CB", name: "Pink" },
  { hex: "#DDA0DD", name: "Plum" },
  { hex: "#B0E0E6", name: "Powder Blue" },
  { hex: "#EAE0C8", name: "Zinc" },
];

describe("Color conversions", () => {
  it("should correctly convert hex to RGB", () => {
    const rgb = hexToRgb("#FFEBCD");
    expect(rgb).toEqual({ r: 255, g: 235, b: 205 });
  });

  it("should convert RGB to Lab without throwing", () => {
    const lab = rgbToLab({ r: 255, g: 218, b: 185 });
    expect(lab.l).toBeTypeOf("number");
    expect(lab.a).toBeTypeOf("number");
    expect(lab.b).toBeTypeOf("number");
  });
});

describe("Delta-E calculations", () => {
  it("should compute small distance for similar colors", () => {
    const lab1 = rgbToLab(hexToRgb("#FFEBCD")); // Blanched Almond
    const lab2 = rgbToLab(hexToRgb("#FFDAB9")); // Peach Puff
    const diff = deltaE76(lab1, lab2);
    expect(diff).toBeLessThan(10); // perceptually close
  });

  it("should compute large distance for very different colors", () => {
    const lab1 = rgbToLab(hexToRgb("#000000")); // Black
    const lab2 = rgbToLab(hexToRgb("#FFFFFF")); // White
    const diff = deltaE76(lab1, lab2);
    expect(diff).toBeGreaterThan(80);
  });
});

describe("ColorList integrity", () => {
  it("should contain the sample colors", () => {
    for (const c of sampleColors) {
      const exists = ColorList.some(cl => cl.hex === c.hex && cl.name === c.name);
      expect(exists).toBe(true);
    }
  });
});

it("should normalize and validate hex correctly", () => {
  expect(normalizeHex("ffebcd")).toBe("#FFEBCD");
  expect(normalizeHex("#ffc0cb")).toBe("#FFC0CB");
  expect(() => normalizeHex("12345")).toThrow();
  expect(() => normalizeHex("GGGGGG")).toThrow();
});