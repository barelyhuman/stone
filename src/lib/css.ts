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

let memo = new Map();

export function css<T extends {}>(theme: T, adaptors?: Adaptors) {
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

    /* 
      Use the hashed class string to identify existing style or similar styles
      This will change when a property in the style changes so duplicates will be 
      close to none but added for `just in case` situations
    */
    if (memo.has(classHash)) {
      ast = memo.get(classHash);
    } else {
      try {
        ast = parse(cssString);
        memo.set(classHash, ast);
      } catch (err) {
        ast = false;
      }
    }

    /* 
      If no adaptors are provided consider it to be a nullish handler
      for just class identification
    */
    if (!adaptors?.css) {
      return classHash;
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
