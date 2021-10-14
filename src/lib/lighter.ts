import { hexToHSL, hslToHex } from "@barelyhuman/tocolor";

export function lighter(percentage: number, color: string) {
  if (!percentage) {
    return color;
  }
  const { h, s, l } = hexToHSL(color);
  let _afterLighten = l + percentage;
  if (_afterLighten > 100) {
    _afterLighten = 100;
  }
  return hslToHex(h, s, _afterLighten);
}
