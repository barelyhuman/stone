// Hash code courtesy https://github.com/cristianbote/goober/blob/master/src/core/to-hash.js

/**
 * Transforms the input into a className.
 * The multiplication constant 101 is selected to be a prime,
 * as is the initial value of 11.
 * The intermediate and final results are truncated into 32-bit
 * unsigned integers.
 * @param {String} str
 * @returns {String}
 */
export const hash = (str: string) => {
  let i = 0,
    out = 11;
  while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
  return 'stone' + out;
};
