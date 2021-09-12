import { camelCase } from "../lib/utils";

export function CSSWebInlineAdaptor(tokens) {
  const ast = tokens.ast;
  let cssStyleObject = {};

  // as css only passes per element style, the rules will mostly be of length:1
  console.log({ ast });
  ast[0].children.forEach((cssDeclaration) => {
    const camelCasePropName = camelCase(cssDeclaration.props);
    cssStyleObject[camelCasePropName] = cssDeclaration.children;
  });

  return cssStyleObject;
}
