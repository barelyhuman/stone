import deepMap from "deep-map-object";
import { CSSWebInlineAdaptor } from "../adaptors/css-web-inline";

import { css } from "./css";
import { darker } from "./darker";
import { lighter } from "./lighter";
import { normalizeHex } from "./utils";

const defaultAdaptors = {
  css: CSSWebInlineAdaptor,
};

/**
 *
 * @param themeConfig
 * @param themeConfig.colors
 * @param themeConfig.dimensions
 * @returns
 */

export function decorate(themeConfig, adaptors) {
  let ctx = this || {};
  adaptors = adaptors || defaultAdaptors;

  if (themeConfig.colors) {
    ctx.colors = deepMap(decorateColor)(themeConfig.colors);
  }
  if (themeConfig.dimensions) {
    ctx.dimensions = deepMap(decorateDimensions)(themeConfig.dimensions);
  }
  ctx.css = css(ctx, adaptors);
  return ctx;
}

function decorateColor(color) {
  let ctx = {};
  ctx.hex = normalizeHex(color);
  ctx.value = () => ctx.hex;
  ctx.toRGB = () => hexToRGB(ctx.hex);
  ctx.toHSL = () => hexToHSL(ctx.hex);
  ctx.darker = (percentage = 0) => {
    const value = darker(percentage, ctx.hex);
    ctx.hex = `#${value}`;
    return ctx;
  };
  ctx.lighter = (percentage = 0) => {
    const value = lighter(percentage, ctx.hex);
    ctx.hex = `#${value}`;
    return ctx;
  };
  return ctx;
}

function decorateDimensions(dimension) {
  const unitRegex = /(\d+)(px|rem|em)$/;
  const result = String(dimension).match(unitRegex);
  return {
    value: () => result[1],
    unit: () => result[2],
  };
}
