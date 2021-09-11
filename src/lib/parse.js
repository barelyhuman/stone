import cssParser from "css";

export function parse(cssString) {
  return cssParser.parse(cssString);
}

export function stringify(cssAST) {
  return cssParser.stringify(cssAST);
}
