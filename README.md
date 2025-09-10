# color-matcher

[![npm version](https://badge.fury.io/js/%40a.r.i_eze%2fcolor-matcher.svg)](https://badge.fury.io/js/%40a.r.i_eze%2fcolor-matcher)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight and performant JavaScript/TypeScript library to find the nearest color from a predefined list. It supports multiple color difference algorithms (CIE76, CIE94, CIEDE2000) for perceptually accurate comparisons.

## Features

-   **Fast and Accurate**: Uses pre-calculated Lab color values for high performance.
-   **Multiple Algorithms**: Supports CIE76, CIE94, and the industry-standard CIEDE2000 for superior perceptual accuracy.
-   **Flexible**: Use the built-in color list or provide your own custom palette.
-   **Rich Information**: Returns the matched color's name, hex code, and the calculated color difference.
-   **TypeScript Ready**: Written in TypeScript with full type definitions.

## Installation

```bash
# npm
npm install @a.r.i_eze/color-matcher

# yarn
yarn add @a.r.i_eze/color-matcher

# pnpm
pnpm add @a.r.i_eze/color-matcher
```

## Use Cases

`color-matcher` can be useful in a variety of applications:

-   **E-commerce**: Tag products with the closest standard color name (e.g., "Crimson Red" for a t-shirt), improving search and filtering for customers.
-   **Data Visualization**: Automatically assign meaningful color names to data points in charts, graphs, and maps for better readability.
-   **Design Systems & Theming**: Map brand colors to a standard color palette, ensuring consistency and helping developers find the right color name.
-   **Accessibility Tools**: Help users with color vision deficiencies by providing the nearest standard color name for any given color.
-   **Image Analysis**: Extract dominant colors from an image and give them human-readable names.

## Usage

### Basic Usage

The `findNearestColor` function is the primary entry point. It takes a hex color string and returns the closest match from its internal color list.

```javascript
import { findNearestColor } from 'color-matcher';

const match = findNearestColor('#FF1000');

if (match) {
  console.log(match.name);     // "Red (Web)"
  console.log(match.hex);      // "#FF0000"
  console.log(match.distance); // A small number indicating the difference
}
```

### Using Different Delta E Formulas

The library defaults to the basic `CIE76` formula. For more perceptually uniform results, you can specify `CIE94` or the recommended `CIEDE2000`.

```javascript
import { findNearestColor } from 'color-matcher';

// Using CIEDE2000 (recommended for best accuracy)
const match2000 = findNearestColor('#008081', { formula: '2000' });
console.log(match2000.name); // "Teal"

// Using CIE94
const match94 = findNearestColor('#008081', { formula: '94' });
console.log(match94.name); // "Teal"
```

### Using a Custom Color Palette

You can provide your own list of colors. For the best performance, pre-calculate the Lab values for your custom list using the exported utility functions.

```javascript
import { findNearestColor, rgbToLab, hexToRgb } from 'color-matcher';

const myPalette = [
  { name: 'My Brand Red', hex: '#D92027' },
  { name: 'My Brand Blue', hex: '#1B98E0' },
  { name: 'My Brand Green', hex: '#4CAF50' },
];

// For best performance, pre-calculate Lab values
const myPaletteWithLab = myPalette.map(color => ({
  ...color,
  lab: rgbToLab(hexToRgb(color.hex))
}));

const match = findNearestColor('#E0252C', {
  colorList: myPaletteWithLab,
  formula: '2000'
});

console.log(match.name); // "My Brand Red"
```

## API Reference

### `findAllClosestColors(inputHex, options?)`

Finds a list of colors that are close to the input color. Returns an array of `ColorMatch` objects, sorted by distance (closest first).

-   `inputHex: string`: The color to match, as a hex string (e.g., `#RRGGBB`).
-   `options?: FindAllClosestColorsOptions`:
    -   `count?: number`: The number of closest colors to return. Defaults to `5`. This option is ignored if `threshold` is set.
    -   `threshold?: number`: The maximum distance for a color to be considered "close". If set, this option takes precedence over `count`.
    -   `formula?: '76' | '94' | '2000'`: The Delta E formula to use. Defaults to `'76'`.
    -   `colorList?: ColorWithLab[]`: A custom array of colors to match against.

#### Example

```javascript
import { findAllClosestColors } from 'color-matcher';

// Get the top 3 closest colors
const top3 = findAllClosestColors('#FF1A00', { count: 3, formula: '2000' });
console.log(top3);

// Get all colors within a distance of 10
const withinThreshold = findAllClosestColors('#008081', { threshold: 10, formula: '2000' });
console.log(withinThreshold.map(c => c.name));
```

### `findNearestColor(inputHex, options?)`

-   `inputHex: string`: The color to match, as a hex string (e.g., `#RRGGBB` or `RRGGBB`).
-   `options?: FindNearestColorOptions`:
    -   `formula?: '76' | '94' | '2000'`: The Delta E formula to use. Defaults to `'76'`.
    -   `colorList?: ColorWithLab[]`: A custom array of colors to match against. Defaults to the built-in `ColorListWithLab`.

Returns a `ColorMatch` object, or `null` if no match is found (e.g. with an empty `colorList`). Throws an error if the input color format is invalid.

### `ColorMatch` Type

The object returned by `findNearestColor`.

```typescript
interface ColorMatch {
  name: string;     // Name of the matched color
  hex: string;      // Hex code of the matched color
  distance: number; // Calculated color difference (lower is closer)
}
```

### Color Lists

-   `ColorList: Color[]`: The default list of colors, each with a `name` and `hex` property.
-   `getColorListWithLab(): ColorWithLab[]`: A function that returns the default list with pre-calculated `lab` values. The result is memoized.

### Delta E Functions

You can also use the Delta E functions directly if you have Lab color values.

-   `deltaE76(lab1: Lab, lab2: Lab): number`
-   `deltaE94(lab1: Lab, lab2: Lab): number`
-   `deltaE2000(lab1: Lab, lab2: Lab): number`

### Color Conversion Utilities

The library exports several color conversion utilities: `hexToRgb`, `rgbToLab`, `rgbToXyz`, and `xyzToLab`.

## Contributing

Contributions are welcome! Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.

To contribute, please follow these steps:

1.  **Fork the repository** and create your branch from `main`.
2.  **Run `npm install`** to set up the development environment.
3.  **Make your changes** and add tests for them.
4.  **Ensure the test suite passes** with `npm test`.
5.  **Submit a pull request** with a clear description of your changes.

## License

MIT