import cssParser from "css";

export function parse(cssString) {
  return cssParser.parse(cssString);
}
