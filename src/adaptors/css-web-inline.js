import { camelCase } from "../lib/utils";

export function CSSWebInlineAdaptor(tokens) {
  const ast = tokens.ast;
  let cssStyleObject = {};

  // as css only passes per element style, the rules will mostly be of length:1
  ast.stylesheet.rules[0].declarations.forEach((cssDeclaration) => {
    const camelCasePropName = camelCase(cssDeclaration.property);
    cssStyleObject[camelCasePropName] = cssDeclaration.value;
  });

  return cssStyleObject;
}
