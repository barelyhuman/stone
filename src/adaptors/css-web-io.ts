import { InjectorTokens } from "..";

/**
 * @name CSSWebIOAdaptor
 * @description pluggable adaptor that takes in stone-cli
 * config params to process triggered css inputs and write them to a file
 */
export function CSSWebIOAdaptor(
  options = { output: "output.css", URL: "http://localhost:5000/css" }
) {
  return function (tokens: InjectorTokens) {
    if (process.env.NODE_ENV === "production") {
      return tokens.classHash;
    }

    const URL = options.URL;

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        css: tokens.raw,
        cwd: __dirname,
        options,
      }),
    })
      // HACK: Digest issues as any issues will be shown on the stone-cli interface
      .then((_) => {
        return true;
      })
      .catch((_) => {
        return true;
      });

    return tokens.classHash;
  };
}
