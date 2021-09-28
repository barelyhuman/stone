import deepMap from 'deep-map-object';
import { CSSWebInlineAdaptor } from '../adaptors/css-web-inline';
import { ColorFactory } from './color-factory';
import { css } from './css';

const defaultAdaptors = {
  css: CSSWebInlineAdaptor,
};

export function decorate(themeConfig, adaptors, middleware) {
  let ctx = {};
  adaptors = adaptors || defaultAdaptors;

  if (themeConfig.colors) {
    ctx.colors = deepMap(decorateColor)(themeConfig.colors);
  }
  if (themeConfig.dimensions) {
    ctx.dimensions = deepMap(decorateDimensions)(themeConfig.dimensions);
  }

  middleware && middleware(ctx);

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
