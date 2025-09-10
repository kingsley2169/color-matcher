import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToLab } from "../src/conversions.js";

describe("hexToRgb", () => {
  it("should convert hex to correct RGB", () => {
    expect(hexToRgb("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
  });
});

describe("rgbToLab", () => {
  it("should return valid Lab object", () => {
    const lab = rgbToLab({ r: 255, g: 0, b: 0 }); // Red
    expect(lab).toHaveProperty("l");
    expect(lab).toHaveProperty("a");
    expect(lab).toHaveProperty("b");
  });
});
