import {
  serialize,
  stringify as stylisStringify,
  compile as stylisParser,
} from "stylis";

export function parse(cssString) {
  return stylisParser(cssString);
}

export function stringify(cssAST) {
  return serialize(cssAST, stylisStringify);
}
