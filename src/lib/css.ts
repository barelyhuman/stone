import { Element } from 'stylis';
import { Decorate } from './decorate.js';
import { hash } from './hash.js';
import { parse } from './parse.js';

export interface InjectorTokens<C, D> {
  ast: Element[];
  classHash: string;
  raw: string;
  theme: Decorate<C, D>;
}

interface Adaptors {
  css: any;
}

export function css<C, D>(theme: Decorate<C, D>, adaptors: Adaptors) {
  return function (val: string[]) {
    let cssString = `{`;

    val.forEach((lineRow: string, index: number) => {
      cssString += lineRow;
      if (!arguments[index + 1]) {
        return;
      }
      if (typeof arguments[index + 1] === 'function') {
        cssString += `${arguments[index + 1](theme)}`;
      } else {
        cssString += `${arguments[index + 1]}`;
      }
    });

    cssString += '}';

    const classHash = hash(cssString);
    cssString = `.${classHash} ${cssString}`;

    let ast;
    try {
      ast = parse(cssString);
    } catch (err) {
      ast = false;
    }

    const data = adaptors.css({
      ast: ast,
      classHash,
      raw: cssString,
      theme: theme,
    });

    return data;
  };
}
