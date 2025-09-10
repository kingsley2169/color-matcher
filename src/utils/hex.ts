/**
 * Normalize and validate a HEX string.
 * Ensures:
 *  - Leading "#" is present
 *  - Exactly 6 hex digits (strips alpha channel if present)
 * Throws if invalid.
 */
export const normalizeHex = (hex: string): string => {
  if (!hex) {
    throw new Error("Empty hex color");
  }

  let normalized = hex.startsWith("#") ? hex : `#${hex}`;
  normalized = normalized.toUpperCase();

  // Handle 8-digit hex with alpha channel by stripping it
  if (/^#[0-9A-F]{8}$/.test(normalized)) {
    return normalized.slice(0, 7);
  }

  if (!/^#[0-9A-F]{6}$/.test(normalized)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return normalized;
};