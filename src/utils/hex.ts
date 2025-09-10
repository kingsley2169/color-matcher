/**
 * Normalize and validate a HEX string.
 * Ensures:
 *  - Leading "#" is present
 *  - Exactly 6 hex digits
 * Throws if invalid.
 */

export const normalizeHex = (hex: string): string => {
  if (!hex) throw new Error("Empty hex color");

  let normalized = hex.startsWith("#") ? hex : `#${hex}`;
  normalized = normalized.toUpperCase();

  const isValid = /^#[0-9A-F]{6}$/.test(normalized);
  if (!isValid) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return normalized;
};
