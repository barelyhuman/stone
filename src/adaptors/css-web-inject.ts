import { InjectorTokens } from "..";
import { stringify } from "../lib/parse";

let STONE_ID = "_stoneid";

/**
 * @name CSSWebInjectAdaptor
 * @description pluggable adaptor that works similar to the CSSWebInlineAdaptor
 * but instead of returning web dom stylesheets, it returns classlist strings that
 * get appended to document at runtime
 */
export function CSSWebInjectAdaptor(tokens: InjectorTokens) {
  if (typeof window === "object") {
    let styleTag = document.querySelector("#" + STONE_ID);

    if (!styleTag) {
      styleTag = document.head.appendChild(document.createElement("style"));
      styleTag.innerHTML = "";
      styleTag.id = STONE_ID;
    }

    styleTag.innerHTML = styleTag.innerHTML + "\n\n" + stringify(tokens.ast);
    return tokens.classHash;
  }
  return tokens.classHash;
}
