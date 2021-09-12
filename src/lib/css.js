import { hash } from "./hash.js";
import { parse } from "./parse.js";

export function css(theme, adaptors) {
  return function (val) {
    let cssString = `{`;

    val.forEach((lineRow, index) => {
      cssString += lineRow;
      if (!arguments[index + 1]) {
        return;
      }
      if (typeof arguments[index + 1] === "function") {
        cssString += `${arguments[index + 1](theme)}`;
      } else {
        cssString += `${arguments[index + 1]}`;
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
