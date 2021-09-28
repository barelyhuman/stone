import { hexToHSL, hexToRGB, HSLEnum, RGBEnum } from '@barelyhuman/tocolor';
import { darker } from './darker';
import { lighter } from './lighter';
import { normalizeHex } from './utils';

class ColorFactory {
  color: string;
  hex: string;
  value: () => string;
  toRGB: () => RGBEnum;
  toHSL: () => HSLEnum;
  darker: (percentage: number) => ColorFactory;
  lighter: (percentage: number) => ColorFactory;

  constructor(color: string) {
    this.color = color;
    this.hex = '#' + normalizeHex(this.color);
    this.value = () => this.hex;
    this.toRGB = () => hexToRGB(this.hex);
    this.toHSL = () => hexToHSL(this.hex);
    this.darker = (percentage = 0) => {
      const value = darker(percentage, this.hex);
      return new ColorFactory(value);
    };
    this.lighter = (percentage = 0) => {
      const value = lighter(percentage, this.hex);
      return new ColorFactory(value);
    };
  }
}

export { ColorFactory };
