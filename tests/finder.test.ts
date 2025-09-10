import { describe, it, expect } from "vitest";
import { findNearestColor } from "../src/finder.js";
import type { ColorWithLab } from "../src/colorsList.js";

const sampleColors = [
  { hex: "#FFEBCD", name: "Blanched Almond" },
  { hex: "#FFDAB9", name: "Peach Puff" },
  { hex: "#CD853F", name: "Peru" },
  { hex: "#FFC0CB", name: "Pink" },
  { hex: "#DDA0DD", name: "Plum" },
  { hex: "#B0E0E6", name: "Powder Blue" },
  { hex: "#EAE0C8", name: "Zinc" },
];

describe("findNearestColor", () => {
  it("should return exact match with 0 distance for known colors", () => {
    for (const color of sampleColors) {
      const match = findNearestColor(color.hex);
      expect(match).toEqual({
        name: color.name,
        hex: color.hex,
        distance: 0,
      });
    }
  });

  it("should return the nearest color for close hex values", () => {
    const match = findNearestColor("#FFEBCC"); // slightly off Blanched Almond
    expect(match?.name).toBe("Blanched Almond");
    expect(match?.hex).toBe("#FFEBCD");
    expect(match?.distance).toBeGreaterThan(0);
    expect(match?.distance).toBeLessThan(2);
  });

  it("should return the nearest color using deltaE94", () => {
    const match = findNearestColor("#FFEBCC", { formula: "94" });
    expect(match?.name).toBe("Blanched Almond");
    expect(match?.distance).toBeGreaterThan(0);
  });

  it("should return the nearest color using deltaE2000", () => {
    const match = findNearestColor("#FFEBCC", { formula: "2000" });
    expect(match?.name).toBe("Blanched Almond");
    expect(match?.distance).toBeGreaterThan(0);
  });

  it("should throw an error for invalid hex", () => {
    expect(() => findNearestColor("#GGGGGG")).toThrow();
    expect(() => findNearestColor("12345")).toThrow();
    expect(() => findNearestColor('invalid-color')).toThrow('Invalid color format. Please provide a valid hex color.');
  });

  it("should use a custom color list when provided", () => {
    const customList: ColorWithLab[] = [
      { hex: "#FF0000", name: "My Red", lab: { l: 53.24, a: 80.09, b: 67.2 } },
      { hex: "#0000FF", name: "My Blue", lab: { l: 32.3, a: 79.19, b: -107.86 } },
    ];

    const match = findNearestColor("#EE0000", { colorList: customList });
    expect(match?.name).toBe("My Red");
  });

  it("should return null when an empty color list is provided", () => {
    const match = findNearestColor("#FF0000", { colorList: [] });
    expect(match).toBeNull();
  });
});