# API

## Helpers

**Stone** provides various helper functions that will add utilities to your the given configs thus making it easier to work with colors across your app.

Combine this with one of the adaptors and `createCSS`, now you have a `css` helper that you can use in any component and it'll provision your colors to you wherever you need it in your code.

### `createColors(colors)`

Utility to convert an object of hex strings into a [`ColorFactory`](#colorfactory) that allows you to use various helper functions like `darker`,`lighter`, `toRGB` etc

**Note: Only accepts full 6 digiti hex colors for now**

```ts
// eg:
// the colors can be as nested as you desire

const colors = createColors({
  black: "#000000",
  white: "#ffffff",
  blue: "#1971c2",
  green: "#099268",
});
```

### `createDimensions(dimensions)`

Utility to convert an object of dimension strings into a [`DimensionFactory`](#dimensionfactory) that allows you to use the units and values separately

```ts
const dimensions = createDimensions({
  borders: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  fontSizes: {
    sm: 12,
    md: 14,
    boldMd: 13,
    lg: 13,
  },
});
```

### `createCSS(theme, adaptors)`

Will return a `css` variable with the passed in theme that can then be used to use your theme anywhere, also accepts an Adaptor to modify the functionality of the css function so you can change [adaptors](#adaptors) to target various platforms

```ts
// eg:
const colors = createColors();
// ...colors

const dimensions = createDimensions();
// dimensions

const alias = {
  brand: colors.blue.lighter(20),
  text: colors.white.lighter(10),
};

const themeConfig = {
  colors,
  dimensions,
  alias,
};

const css = createCSS({ colors, dimensions, alias }, adaptors);

const buttonStyle = css`
    background-color: ${(theme) => theme.alias.brand.value()}
    color: ${(theme) => theme.alias.brand.value()}
`;
```

You can then use `buttonStyle` based on the adaptor type, learn more about this in the [Adaptors](#adaptors) section

## Adaptors

Adaptors play the most important role here as it's what gives a developer the freedom to create different instances of stone each doing it's own thing. You can have a ReactNative adaptor and a normal WebInject adaptor, one will create `StyleSheet.create` frozen objects for your RN code and one would return hashed classes that you could use for your web components.

And since there's no limitation to what you can add to the adaptor

1. Make sure you know what adaptor you are using, specially one's that manipulate your filesystem
2. You can go bonkers with the type of functionality you want

### `CSSWebInlineAdaptor`

As the name suggests, it gives back inline styles in an object format for you to use with the `style` property on web dom elements. Using this adaptor with the `createCSS` helper will return the `css` template literal function that will allow you to write normal css and return JS DOM style objects.

```js
// eg:
const buttonStyle = css`
    background-color: ${(theme) => theme.alias.brand.value()}
    color: ${(theme) => theme.alias.brand.value()}
`;
// would become

const buttonStyle = {
  // original value of brand is #1971c2 and this is darker by 20%
  backgroundColor: "#56A3EA",
  color: "#56A3EA",
};
```

### `CSSWebInjectAdaptor`

This is what is done by most CSS-in-JS libraries, which don't have a compile time step, the adaptor generates css and adds it to the document head. So as each component/ page is rendered your styles are added to the html head and thus reduce the initial load times but still have an impact on the runtime if you add a huge amount of css that needs to be added.
While this is something you can use, you should probably use a plugin that allows you to create static css files based on your code

```tsx
// eg:
const buttonStyle = css`
    background-color: ${(theme)=>theme.alias.brand.value()}
    color: ${(theme)=>theme.alias.brand.value()}
`;

// would become
const buttonStyle = ".stone_<hash>"

// in some component
<StyledButton className={buttonStyle} />
```

### `CSSWebIOAdaptor`

_**(WIP)**_

While a version of this is available to use, this depends on [stone-cli](https://github.com/barelyhuman/stone-cli) and is incomplete as it can only write the css file based on each page you visit, so if you ever delete the css while, you'll have to go through every page of your app to add those styles to your css file. Which isn't recommended in production so you are beter off using the other 2 adaptors for now.

```js
//eg:
const adaptors = {
  css: CSSWebIOAdaptor({
    output: path.join(__dirname, "/demo.css"),
    URL: "http://localhost:5000/css",
  }),
};

const css = createCSS({ colors, dimensions, alias }, adaptors);

// so this
const buttonStyle = css`
    background-color: ${(theme) => theme.alias.brand.value()}
    color: ${(theme) => theme.alias.brand.value()}
`;

// would go ahead and be added to a `demo.css` file like
```

```css
.stone_<hash > {
  background-color: #56a3ea;
  color: #56a3ea;
}
```

## Factories

### `ColorFactory`

```ts
class ColorFactory {
  color: string;
  hex: string;
  value: () => string;
  toRGB: () => RGBEnum;
  toHSL: () => HSLEnum;
  darker: (percentage: number) => ColorFactory;
  lighter: (percentage: number) => ColorFactory;
}
```

### `DimensionFactory`

```ts
class DimensionFactory {
  raw: string | number;
  value: () => string | number;
  unit: () => string | number;
}
```
