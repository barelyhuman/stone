import { InjectorTokens } from "..";
import { camelCase } from "../lib/utils";
import { Element } from "stylis";

/**
 * @name CSSWebInlineAdaptor
 * @description pluggable adaptor that takes in css
 * parsed tokens and returns a web dom stylesheet
 */
export function CSSWebInlineAdaptor(tokens: InjectorTokens) {
  const ast = tokens.ast;
  let cssStyleObject: any = {};

  // as css only passes per element style, the rules will mostly be of length:1
  if (!(ast && ast[0]?.children)) {
    return;
  }

  const astIterator = ast[0].children || [];

  (astIterator as Element[]).forEach((cssDeclaration: Element) => {
    const camelCasePropName = camelCase(cssDeclaration.props as string);
    cssStyleObject[camelCasePropName] = cssDeclaration.children;
  });

  return cssStyleObject;
}
