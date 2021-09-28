import {
  serialize,
  stringify as stylisStringify,
  compile as stylisParser,
  Element,
} from 'stylis';

export function parse(cssString: string) {
  return stylisParser(cssString);
}

export function stringify(cssAST: (string | Element)[]) {
  return serialize(cssAST, stylisStringify);
}
