import deepMap from "deep-map-object";
import { CSSWebInlineAdaptor } from "../adaptors/css-web-inline";
import { ColorFactory } from "./color-factory";
import { css } from "./css";

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
  return new ColorFactory(color);
}

function decorateDimensions(dimension) {
  const unitRegex = /(\d+)(px|rem|em)$/;
  const result = String(dimension).match(unitRegex);
  return {
    value: () => result[1],
    unit: () => result[2],
  };
}
