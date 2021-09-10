import { hexToHSL, hslToHex } from "tocolor";

export function darker(percentage, color) {
  if (!percentage) {
    return color;
  }
  const { h, s, l } = hexToHSL(color);
  const _afterDarken = l - percentage;
  return hslToHex(h, s, _afterDarken);
}
