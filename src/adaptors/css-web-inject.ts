import { InjectorTokens } from '..';
import { stringify } from '../lib/parse';

let STONE_ID = '_stoneid';

export function CSSWebInjectAdaptor<C, D>(tokens: InjectorTokens<C, D>) {
  if (typeof window === 'object') {
    let styleTag = document.querySelector('#' + STONE_ID);

    if (!styleTag) {
      styleTag = document.head.appendChild(document.createElement('style'));
      styleTag.innerHTML = '';
      styleTag.id = STONE_ID;
    }

    styleTag.innerHTML = styleTag.innerHTML + '\n\n' + stringify(tokens.ast);
    return tokens.classHash;
  }
  return tokens.classHash;
}
