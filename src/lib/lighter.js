import { hexToHSL, hslToHex } from "@barelyhuman/tocolor";

export function lighter(percentage, color) {
  if (!percentage) {
    return color;
  }
  const { h, s, l } = hexToHSL(color);
  const _afterLighten = l + percentage;
  return hslToHex(h, s, _afterLighten);
}
