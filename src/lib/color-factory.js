import { hexToHSL, hexToRGB } from "@barelyhuman/tocolor";
import { darker } from "./darker";
import { lighter } from "./lighter";
import { normalizeHex } from "./utils";

const ColorFactory = function (color) {
  let ctx = this || {};
  ctx.hex = "#" + normalizeHex(color);
  ctx.value = () => ctx.hex;
  ctx.toRGB = () => hexToRGB(ctx.hex);
  ctx.toHSL = () => hexToHSL(ctx.hex);
  ctx.darker = (percentage = 0) => {
    const value = darker(percentage, ctx.hex);
    return new ColorFactory(value);
  };
  ctx.lighter = (percentage = 0) => {
    const value = lighter(percentage, ctx.hex);
    return new ColorFactory(value);
  };
  return ctx;
};

export { ColorFactory };
