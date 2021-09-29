import { hexToHSL, hslToHex } from '@barelyhuman/tocolor';

export function darker(percentage: number, color: string) {
  if (!percentage) {
    return color;
  }
  const { h, s, l } = hexToHSL(color);
  const _afterDarken = l - percentage;
  return hslToHex(h, s, _afterDarken);
}