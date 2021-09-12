import { stringify } from "../lib/parse";

export function CSSWebIOAdaptor(
  options = { output: "output.css", URL: "http://localhost:5000/css" }
) {
  return function (tokens) {
    if (process.env.NODE_ENV === "production") {
      return tokens.classHash;
    }

    const URL = options.URL;

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        css: stringify(tokens.ast),
        cwd: __dirname,
        options,
      }),
    })
      .then((res) => {
        if (!res.ok && res.status === 404) {
          throw new Error("Make sure your stone-cli is running");
        }
        return true;
      })
      .catch((err) => {
        if (err instanceof TypeError && err.message === "Failed to fetch") {
          throw new Error("Make sure your stone-cli is running");
        }
        throw err;
      });

    return tokens.classHash;
  };
}
