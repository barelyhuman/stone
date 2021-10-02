Stone is fun pet project that I wanted to do.

It's based off of [AndrewPrifer/theminator](https://github.com/AndrewPrifer/theminator)'s concept of being to use simple theme configurations and using them as styles.

This though isn't very performant when working with platforms so this library aims to move it ahead by acting as a pre-processor that bundles styles for the same.

This allows us to convert needed theme into proper stylesheets when working with **web** and `StyleSheet.create` insertions when working with something like **React Native**. These are accomplished by babel plugins that create the needed files at runtime and import them as modules for web and create `Stylesheet.create` when working with React Native.

The library isn't limited to the two platforms as you can find other **handlers** (or create your own) to support you preferred platform.

```ts
// theme.js
import {
  createColors,
  createCSS,
  createDimensions,
  CSSWebInjectAdaptor,
} from "@barelyhuman/stone";

const colors = createColors({
  black: "#000000",
  white: "#ffffff",
  blue: "#1971c2",
  green: "#099268",
});

const dimensions = createDimensions({
  sm: "5px",
  md: "1em",
  lg: "2rem",
  xl: "2.5rem",
});

const alias = {
  brand: colors.blue.lighter(20),
  text: colors.white.lighter(10),
};

const themeConfig = {
  colors,
  dimensions,
  alias,
};

const adaptors = {
  css: CSSWebInjectAdaptor,
};

const css = createCSS({ colors, dimensions, alias }, adaptors);

type StoneThemeConfig = typeof themeConfig;

// Don't have to export everything since you'll most probably just use `css` for most part;
export { css, colors, dimensions, alias, StoneThemeConfig };
```

```ts
// button.js

import { css } from "theme.js";

const buttonStyle = css`
  padding: 0 ${(theme: StoneThemeConfig) => theme.dimensions.md.raw};
  font-size: 14px;
  line-height: 27px;
  background-color: ${(theme: StoneThemeConfig) => theme.alias.brand.value()};
  color: ${(theme: StoneThemeConfig) => theme.alias.text.value()};

  &:hover {
    background-color: ${(theme: StoneThemeConfig) =>
      theme.colors.black.value()};
  }
`;

const button = document.createElement("button");

button.classList.add(buttonStyle);
```
