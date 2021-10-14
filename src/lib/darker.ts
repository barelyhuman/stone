import { hexToHSL, hslToHex } from "@barelyhuman/tocolor";

export function darker(percentage: number, color: string) {
  if (!percentage) {
    return color;
  }
  const { h, s, l } = hexToHSL(color);
  let _afterDarken = l - percentage;
  if (_afterDarken < 0) {
    _afterDarken = 0;
  }
  return hslToHex(h, s, _afterDarken);
}
