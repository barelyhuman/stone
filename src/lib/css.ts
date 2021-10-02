import { Element } from "stylis";
import { hash } from "./hash.js";
import { parse } from "./parse.js";

export interface InjectorTokens {
  ast: Element[];
  classHash: string;
  raw: string;
}

export interface Adaptors {
  css: any;
}

export function css<T extends {}>(theme: T, adaptors: Adaptors) {
  return function (strings: TemplateStringsArray | string[], ...params: any) {
    let cssString = `{`;

    strings.forEach((lineRow: string, index: number) => {
      cssString += lineRow;
      if (!params[index]) {
        return;
      }
      if (typeof params[index] === "function") {
        cssString += `${params[index](theme)}`;
      } else {
        cssString += `${params[index]}`;
      }
    });

    cssString += "}";

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
