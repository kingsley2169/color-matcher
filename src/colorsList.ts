import { hexToRgb, rgbToLab } from "./conversions.js";
import type { Lab } from "./conversions.js";

export interface Color {
  hex: string;
  name: string;
}

export interface ColorWithLab extends Color {
  lab: Lab;
}

export const ColorList: Color[] = [
    // A
    { hex: "#5D8AA8", name: "Air Force Blue" }, 
    { hex: "#F0F8FF", name: "Alice Blue" },
    //B
    { hex: "#89CFF0", name: "Baby Blue" }, 
    { hex: "#F5F5DC", name: "Beige" },
    { hex: "#000000", name: "Black" },
    { hex: "#318CE7", name: "Bleu de France" }, 
    { hex: "#FFEBCD", name: "Blanched Almond" },
    { hex: "#0000FF", name: "Blue" },
    { hex: "#7393B3", name: "Blue Gray" }, 
    { hex: "#8A2BE2", name: "Blue Violet" },
    { hex: "#A52A2A", name: "Brown" },
    { hex: "#964B00", name: "Brownie" },
    { hex: "#DEB887", name: "Burly Wood" },

    // C
    { hex: "#5F9EA0", name: "Cadet Blue" },
    { hex: "#006B3C", name: "Cadmium Green" },
    { hex: "#D27D46", name: "Camel" }, 
    { hex: "#7CFC00", name: "Chartreuse" },
    { hex: "#6F4E37", name: "Coffee" }, 
    { hex: "#FF7F50", name: "Coral" },
    { hex: "#6495ED", name: "Cornflower Blue" },
    { hex: "#FFF8DC", name: "Cornsilk" },
    { hex: "#DC143C", name: "Crimson" },
    { hex: "#990000", name: "Crimson Red" },

    // D
    { hex: "#00008B", name: "Dark Blue" },
    { hex: "#008B8B", name: "Dark Cyan" },
    { hex: "#B8860B", name: "Dark Goldenrod" },
    { hex: "#A9A9A9", name: "Dark Grey" },
    { hex: "#006400", name: "Dark Green" },
    { hex: "#BDB76B", name: "Dark Khaki" },
    { hex: "#8B008B", name: "Dark Magenta" },
    { hex: "#556B2F", name: "Dark Olive Green" },
    { hex: "#9932CC", name: "Dark Orchid" },
    { hex: "#8B0000", name: "Dark Red" },
    { hex: "#E9967A", name: "Dark Salmon" },
    { hex: "#8FBC8F", name: "Dark Sea Green" },
    { hex: "#483D8B", name: "Dark Slate Blue" },
    { hex: "#2F4F4F", name: "Dark Slate Gray" },
    { hex: "#9400D3", name: "Dark Violet" },
    { hex: "#FF1493", name: "Deep Pink" },
    { hex: "#00BFFF", name: "Deep Sky Blue" },
    { hex: "#0E4D92", name: "Denim" },
    { hex: "#1E90FF", name: "Dodger Blue" },
    { hex: "#D70A53", name: "Dogwood Rose" },
    { hex: "#F5F5F5", name: "Dust Storm" },
    
    // E
    { hex: "#1C1C1C", name: "Eerie Black" },
    { hex: "#7DF9FF", name: "Electric Blue" },
    { hex: "#BF00FF", name: "Electric Indigo" },
    { hex: "#CCFF00", name: "Electric Lime" },
    { hex: "#F4BBFF", name: "Electric Purple" },
    { hex: "#FFFF33", name: "Electric Yellow" },
    { hex: "#50C878", name: "Emerald" },

    // F
    { hex: "#228B22", name: "Forest Green" },
    { hex: "#B22222", name: "Fire Brick" },
    { hex: "#FFFAF0", name: "Floral White" },
    { hex: "#C19A6B", name: "Fallow" },
    { hex: "#B53389", name: "Fandango" },

    // G
    { hex: "#DCDCDC", name: "Gainsboro" },
    { hex: "#F8F8FF", name: "Ghost White" },
    { hex: "#FFD700", name: "Gold" },
    { hex: "#DAA520", name: "Goldenrod" },
    { hex: "#996515", name: "Golden Brown" }, 
    { hex: "#808080", name: "Gray" },
    { hex: "#008000", name: "Green" },
    { hex: "#ADFF2F", name: "Green Yellow" },


    // H
    { hex: "#F0FFF0", name: "Honeydew" },
    { hex: "#FF69B4", name: "Hot Pink" },
    { hex: "#355E3B", name: "Hunter Green" },

    // I
    { hex: "#72A0C1", name: "Iceberg" },
    { hex: "#CD5C5C", name: "Indian Red" },
    { hex: "#4B0082", name: "Indigo" },
    { hex: "#FFFFF0", name: "Ivory" },

    // J
    { hex: "#29AB87", name: "Jade" },
    { hex: "#F8DE7E", name: "Jasmine" },
    { hex: "#F4CA16", name: "Jonquil" },
    { hex: "#D73B3E", name: "Jordy Blue" },
    { hex: "#A50B5E", name: "Jazzberry Jam" },
    { hex: "#F2F3F4", name: "Jungle Mist" },
    { hex: "#343434", name: "Jet Black" },

    // K
    { hex: "#F0E68C", name: "Khaki" },
    { hex: "#C3B091", name: "Khaki Gray" },
    { hex: "#8E7618", name: "Kobe" },
    { hex: "#E79FC4", name: "Kobi" },
    { hex: "#3D2B1F", name: "Kona Coffee" },
    { hex: "#E6F2EA", name: "Kokoda" },
    { hex: "#FAD6A5", name: "Koromiko" },
    

    // L
    { hex: "#E6E6FA", name: "Lavender" },
    { hex: "#FFF0F5", name: "Lavender Blush" },
    { hex: "#FFFACD", name: "Lemon Chiffon" },
    { hex: "#FAFAD2", name: "Light Goldenrod Yellow" },
    { hex: "#D3D3D3", name: "Light Grey" },
    { hex: "#FFB347", name: "Light Orange" },
    { hex : "#FAF0BE", name: "Laser Lemon" },
    { hex: "#FFF700", name: "Lemon" },
    { hex: "#C8A2C8", name: "Lilac" },
    { hex: "#BFFF00", name: "Lime" },
    { hex: "#32CD99", name: "Lime Green (Web)" },
    { hex: "#E3F988", name: "Light Lime" },
    { hex: "#B5651D", name: "Light Brown" },
    { hex: "#6D9BC3", name: "Light Cornflower Blue" },
    { hex: "#E0FFFF", name: "Light Cyan (Web)" },
    { hex: "#F08080", name: "Light Coral (Web)" },
    { hex: "#93CCEA", name: "Light Sky Blue" },
    { hex: "#FFA07A", name: "Light Salmon (Web)" },
    { hex: "#20B2AA", name: "Light Sea Green (Web)" },
    { hex: "#D3D3D3", name: "Light Gray (Web)" },
    { hex: "#90EE90", name: "Light Green (Web)" },
    { hex: "#FFB6C1", name: "Light Pink (Web)" },
    { hex: "#FFFFE0", name: "Light Yellow (Web)" },
    { hex: "#ADD8E6", name: "Light Blue (Web)" },
    { hex: "#FDF5E6", name: "Linen" },

    // M
    { hex: "#800000", name: "Maroon" },
    { hex: "#FF00FF", name: "Magenta" },
    { hex: "#66CDAA", name: "Medium Aquamarine" },
    { hex: "#0000CD", name: "Medium Blue" },
    { hex: "#BA55D3", name: "Medium Orchid" },
    { hex: "#9370DB", name: "Medium Purple" },
    { hex: "#3CB371", name: "Medium Sea Green" },
    { hex: "#7B68EE", name: "Medium Slate Blue" },
    { hex: "#00FA9A", name: "Medium Spring Green" },
    { hex: "#48D1CC", name: "Medium Turquoise" },
    { hex: "#C71585", name: "Medium Violet Red" },
    { hex: "#191970", name: "Midnight Blue" },
    { hex: "#F5FFFA", name: "Mint Cream" },
    { hex: "#FFE4E1", name: "Misty Rose" },
    { hex: "#FFE4B5", name: "Moccasin" },

    // N
    { hex: "#000080", name: "Navy Blue" },

    // O
    { hex: "#FFD700", name: "Old Gold" },
    { hex: "#DAA520", name: "Old Lace" },
    { hex: "#808000", name: "Olive" },
    { hex: "#6B8E23", name: "Olive Drab" },
    { hex: "#FFA500", name: "Orange" },
    { hex: "#FF4500", name: "Orange Red" },
    { hex: "#DA70D6", name: "Orchid" },
    

    // P
    { hex: "#AFEEEE", name: "Pale Turquoise" },
    { hex: "#DB7093", name: "Pale Violet Red" },
    { hex: "#FFEFD5", name: "Papaya Whip" },
    { hex: "#FFDAB9", name: "Peach Puff" },
    { hex: "#CD853F", name: "Peru" },
    { hex: "#FFC0CB", name: "Pink" },
    { hex: "#DDA0DD", name: "Plum" },
    { hex: "#B0E0E6", name: "Powder Blue" },
    { hex: "#800080", name: "Purple" },
    { hex: "#A020F0", name: "Purple (Web)" },
    { hex: "#716B56", name: "Peat" },

    // Q
    { hex: "#8A496B", name: "Quinacridone Magenta" },
    { hex: "#3C3B6E", name: "Queen Blue" },
    { hex: "#E8CCD7", name: "Quill Gray" },
    { hex: "#A57C00", name: "Quinoline Yellow" },
    { hex: "#86608E", name: "Quinacridone Violet" },
    { hex: "#5B92E5", name: "Queen Pink" },
    { hex: "#D6CADD", name: "Quartz Gray" },
    { hex: "#E3E4FA", name: "Quartz" },
    { hex: "#6C6961", name: "Quill Gray" },

    // R
    { hex: "#FF00FF", name: "Red" },
    { hex: "#BC8F8F", name: "Rosy Brown" },
    { hex: "#4169E1", name: "Royal Blue" },
    { hex: "#80461B", name: "Russet" },
    { hex: "#B7410E", name: "Rust" },
    { hex: "#FF0000", name: "Red (Web)" },
    { hex: "#E30B17", name: "Red Devil" },
    { hex: "#C72C48", name: "Raspberry" },
    { hex: "#E0115F", name: "Ruby" },
    { hex: "#9B111E", name: "Ruby Red" },
    { hex: "#A52A2A", name: "Red Brown" },

    // S
    { hex: "#8B4513", name: "Saddle Brown" },
    { hex: "#FA8072", name: "Salmon" },
    { hex: "#F4A460", name: "Sandy Brown" },
    { hex: "#2E8B57", name: "Sea Green" },
    { hex: "#FFF5EE", name: "Seashell" },
    { hex: "#A0522D", name: "Sienna" },
    { hex: "#C0C0C0", name: "Silver" },
    { hex: "#87CEEB", name: "Sky Blue" },
    { hex: "#6A5ACD", name: "Slate Blue" },
    { hex: "#708090", name: "Slate Gray" },
    { hex: "#4DD21D", name: "Sport Green" },
    { hex: "#00FF7F", name: "Spring Green" },
    { hex: "#4682B4", name: "Steel Blue" },
    { hex: "#E4D96F", name: "Straw" }, 

    // T
    { hex: "#D2B48C", name: "Tan" },
    { hex: "#008080", name: "Teal" },
    { hex: "#FF6347", name: "Tomato" },
    { hex: "#40E0D0", name: "Turquoise" },

    // U
    { hex: "#3F00FF", name: "Ultramarine" },


    // V
    { hex: "#EE82EE", name: "Violet" },
    { hex: "#00FA9A", name: "Viridian" },

    // W
    { hex: "#F5DEB3", name: "Wheat" },
    { hex: "#FFFFFF", name: "White" },
    { hex: "#F5F5F5", name: "White Smoke" },
    { hex: "#722F37", name: "Wine" },

    //X 
    { hex: "#1E272C", name: "Xiketic" },
    { hex: "#4B0082", name: "Xanadu" },

    // Y
    { hex: "#0F4D92", name: "Yale Blue" }, 
    { hex: "#FFFF00", name: "Yellow" },
    { hex: "#9ACD32", name: "Yellow Green" },

    // Z
    { hex: "#EAE0C8", name: "Zinc" },

];

let _colorListWithLab: ColorWithLab[] | null = null;

/**
 * A list of colors with their Lab values pre-calculated.
 * The calculation is memoized for performance.
 */
export function getColorListWithLab(): ColorWithLab[] {
  if (_colorListWithLab) {
    return _colorListWithLab;
  }
  _colorListWithLab = ColorList.map((color) => ({
    ...color,
    lab: rgbToLab(hexToRgb(color.hex)),
  }));
  return _colorListWithLab;
}
