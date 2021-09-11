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

    const data = adaptors.css({
      ast: parse(cssString),
      classHash,
      theme: theme,
    });

    return data;
  };
}
