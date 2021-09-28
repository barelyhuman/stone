import { hexToHSL, hslToHex } from '@barelyhuman/tocolor';

export function lighter(percentage: number, color: string) {
  if (!percentage) {
    return color;
  }
  const { h, s, l } = hexToHSL(color);
  const _afterLighten = l + percentage;
  return hslToHex(h, s, _afterLighten);
}
