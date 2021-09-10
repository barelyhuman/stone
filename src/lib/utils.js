export function normalizeHex(hex) {
  return String(hex).trim().replace(/^#/, "").toLowerCase();
}

// not a generic solution, specifically for css props that are generally separated by `-`
export function camelCase(str) {
  const splits = str.split(/-/);

  const camel = splits
    .map((item, index) => {
      let word = item.toLowerCase();
      if (index !== 0) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join("");
  return camel;
}
