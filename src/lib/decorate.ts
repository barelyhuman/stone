import deepMapObject from "deep-map-object";
import { ColorFactory } from "./color-factory";
import { css, Adaptors } from "./css";
import { DimensionFactory } from "./dimension-factory";

/**
 * @name createColors
 * @description Utility to convert an object of hex strings into a ColorFactory
 * that allows you to use various helper functions like `darker`,`lighter`, `toRGB` etc
 */
export function createColors<C extends {}>(colors: C) {
  return deepMapObject((colorVal: string) => {
    return new ColorFactory(colorVal);
  })(colors);
}

/**
 * @name createDimensions
 * @description Utility to convert an object of dimension strings into a DimensionFactory
 * that allows you to use the units and values separately
 */
export function createDimensions<D extends {}>(dimensions: D) {
  return deepMapObject((dimension: string | number) => {
    return new DimensionFactory(dimension);
  })(dimensions);
}

/**
 * @name createCSS
 * @description Will return a `css` variable with the passed in theme that can then be used
 * to use your theme anywhere, also accepts an Adaptor to modify the functionality of the css function
 * so you can change adaptors to target various platforms
 */
export function createCSS<T extends {}>(theme: T, adaptors?: Adaptors) {
  return css(theme, adaptors);
}
