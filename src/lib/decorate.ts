import deepMapObject, { MappedValues } from 'deep-map-object';
import { CSSWebInlineAdaptor } from '../adaptors/css-web-inline';
import { ColorFactory } from './color-factory';
import { css } from './css';

export interface ThemeConfig<Colors, Dimensions> {
  colors?: Colors;
  dimensions?: Dimensions;
}

type DecoratedColor<Colors> = {
  [K in keyof Colors]: Colors[K] extends object
    ? MappedValues<Colors[K], ColorFactory>
    : ColorFactory;
};

interface IDecoratedDimension {
  value: () => number | null;
  unit: () => string | null;
}

type DecoratedDimension<Dimensions> = {
  [K in keyof Dimensions]: Dimensions[K] extends object
    ? MappedValues<Dimensions[K], IDecoratedDimension>
    : IDecoratedDimension;
};

export interface Decorate<C, D> {
  css?: any;
  colors?: DecoratedColor<C>;
  dimensions?: DecoratedDimension<D>;
  [x: string]: any;
}

const defaultAdaptors = {
  css: CSSWebInlineAdaptor,
};

export function decorate<C extends {}, D extends {},U extends Decorate<C,D>>(
  themeConfig: ThemeConfig<C, D>,
  adaptors: any,
  middleware?: (ctx: Decorate<C, D>) => U
): U {
  const ctx = {
    colors: {},
    dimensions: {},
  } as Decorate<C,D>;

  adaptors = adaptors || defaultAdaptors;

  if (themeConfig.colors) {
    ctx.colors = decorateColor(themeConfig.colors);
  }
  if (themeConfig.dimensions) {
    ctx.dimensions = decorateDimensions(themeConfig.dimensions);
  }

  const ctx2 = (middleware && middleware(ctx) )|| ctx;

  ctx2.css = css(ctx2, adaptors);

  return ctx2 as U;
}

function decorateColor<C extends object>(colors: C) {
  return deepMapObject((colorVal: string) => {
    return new ColorFactory(colorVal);
  })(colors);
}

function decorateDimensions<D extends object>(dimensionsList: D) {
  return deepMapObject((dimension: string | number) => {
    const unitRegex = /(\d+)(px|rem|em)$/;
    const result: (string | number)[] | null =
      String(dimension).match(unitRegex);
    return {
      value: () => result && result[1],
      unit: () => result && result[2],
    } as IDecoratedDimension;
  })(dimensionsList);
}
