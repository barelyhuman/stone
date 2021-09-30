# Documentation

Stone is simple framework agnostic , theme based **css-in-js** library. Due to the nature of the library the documentation is a bit dense, do go through the implementations as much as you can or head to the issues to report things that you think needs fixing.

## Theme Creation

The primary part is creating a theme and so the below is how a general theme configuration would look like. This is all **type safe** so you can actually expect the editor to autocomplete as long as your ts-server is running. Example with TS code is available in [demo.ts](../example/web-inject/demo.ts) or in the usage example of [CSSWebInjectAdaptor](#csswebinjectadaptor)

```js
const themeConfig = {
  colors: {
    white: '#ffffff',
    black: '#000000',
  },
  dimensions: {
    sm: '5px',
    md: '1em',
    lg: '2rem',
    xl: '2.5rem',
  },
};
```

### `decorate`

The `decorate` function is what takes care of adding helpers to your defined colors and units, each color then get's the added functionality of `lighter` and `darker` that you can use to manipulate the color, this is similar to how `sass lighten/darken` work.

```js
import { CSSWebInlineAdaptor, decorate } from '@barelyhuman/stone';

//  ... themeConfig

// middleware is an optional function
const { css, dimensions, colors } = decorate(themeConfig, adaptors, middleware);
```

** `middleware` ** 
Middleware is an optional function that you can use to manipulate the returned values of `{ css, dimensions, colors }` and return more things like, a very simplistic example would be to also return aliases for the same set of colors. 

You can define aliases on the original config but maybe you want to generate these aliases using the existing colors.

eg:
```js
const {css,colors,dimensions,alias} = decorate({
  colors:{
    red:"#fff"
  }
},undefined,(ctx)=>{
  return {
    ...ctx,
    alias:{
      brand: ctx.colors.red.lighter(10)
    }
  }
})
```

and obviously, you are not limited to this, you do a lot more than just this, you can have a base color and generate all shades with the provided helpers.

**`dimensions, colors, css`**

The returned values each have their own significance.

- `dimensions` - These are the same values from `themeConfig` but split into units and values, thus making it easier to use around when working with different units.
- `colors` - These are the colors from `themeConfig`, with the `lighter` and `darker` helpers
- `css` - If working with adaptors, the `css` is a template literal function that you can use to define css properties and will return values based on the provided [adaptor](#adaptors).

## Adaptors

The library tries to be as agnostic as possible while keeping the size small. This is where the adaptors come in place, there's a few that come bundled with the library and this documentation covers them.

- [CSSWebInlineAdaptor](#csswebioadaptor)
- [CSSWebInjectAdaptor](#csswebinjectadaptor)
- [CSSWebIOAdaptor](#csswebioadaptor)

### CSSWebInlineAdaptor

#### About

The `Web Inline` adaptor creates inline styles that are returned as js dom style objects that can be used in React / Vue / etc and you can have other pre-processors convert them into classes as needed or use them as is. These are not performant at all and you are better off using this in server rendered templates.

#### Usage

The below is taken from the `web-inline` example you can find in this repo

```js
import { CSSWebInlineAdaptor, decorate } from '@barelyhuman/stone';

const themeConfig = {
  colors: {
    base: '#ffffff',
    text: '#000000',
    button: {
      base: '#f8f9fa',
      text: '#495057',
    },
  },
  dimensions: {
    button: {
      radius: '6px',
    },
    sm: '5px',
    md: '1em',
    lg: '2rem',
    xl: '2.5rem',
  },
};

const adaptors = {
  css: CSSWebInlineAdaptor,
};

const { css } = decorate(themeConfig, adaptors);

const buttonStyle = css`
  background-color: ${(theme) => theme.colors.button.base.value()};
  color: ${(theme) => theme.colors.button.text.value()};
  border: 2px solid ${(theme) => theme.colors.button.base.value()};
  border-radius: ${(theme) =>
    theme.dimensions.button.radius.value() +
    theme.dimensions.button.radius.unit()};
  height: 32px;
  padding: 0 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
`;

const buttonStyleHover = css`
  outline: #000;
  color: #000;
  background: ${(theme) => theme.colors.button.base.darker(10).value()};
`;

console.log(buttonStyle);

const button = document.createElement('button');

button.innerText = 'Button';
button.classList.add(buttonStyle);

button.addEventListener('mouseover', () => {
  button.classList.add(buttonStyleHover);
});

button.addEventListener('mouseout', () => {
  button.classList.remove(buttonStyleHover);
});

document.body.appendChild(button);
```

#### Options

Has no options right now.

### CSSWebInjectAdaptor

#### About

The `Web Inject` adaptor is similar to other existing CSS-in-JS solutions that return a `class` name and keeps adding the styles to the `head > style` tag as needed. This is a little more adaptive but has a runtime overhead, while being really tiny, this is still overhead and similar to the above adaptor but is still a better choice.

#### Usage

The below is taken from the `web-inject` example you can find in this repo

```js
import { CSSWebInlineAdaptor, decorate } from '@barelyhuman/stone';
const _themeConfig = {
  colors: {
    gray: {
      light: {
        shade50: '',
        100: '',
      },
    },
    base: '#ffffff',
    text: '#000000',
  },
  dimensions: {
    sm: '5px',
    md: '1em',
    lg: '2rem',
    xl: '2.5rem',
  },
};

const adaptors = {
  css: CSSWebInjectAdaptor,
};

const themeConfig = decorate(_themeConfig, adaptors, (ctx) => {
  const { colors, dimensions } = ctx;
  let _clone = {
    ...ctx,
    alias : {
      button: {
        base: colors.base.darker(10),
        text: colors.text.lighter(20),
        radius: dimensions.sm,
        hoverBG: colors.base.darker(20),
      },
    }  
  };
  return _clone;
});

type StoneThemeConfig = typeof themeConfig;

const { css } = themeConfig;

const buttonStyle = css`
  background-color: ${(theme: StoneThemeConfig) =>
    theme.alias.button.base.value()};
  color: ${(theme: StoneThemeConfig) => theme.alias.button.text.value()};
  border: 2px solid
    ${(theme: StoneThemeConfig) => theme.alias.button.base.value()};
  border-radius: ${(theme: StoneThemeConfig) =>
    theme.alias.button.radius.value() + theme.alias.button.radius.unit()};
  height: 32px;
  padding: 0 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    outline: #000;
    color: #000;
    background: ${(theme: StoneThemeConfig) =>
      theme.alias.button.hoverBG.value()};
    border-color: ${(theme: StoneThemeConfig) =>
      theme.alias.button.hoverBG.value()};
  }
`;

const button = document.createElement('button');

button.innerText = 'Button';
button.classList.add(buttonStyle);

document.body.appendChild(button);
```

### CSSWebIOAdaptor

#### About

The `Web IO` adaptor is a network adaptor and works in conjuction with the [stone-cli](https://github.com/barelyhuman/stone-cli), the stone-cli is a small binary server that handles the css compilation and creates the `.css` for you.

#### Advantages

The advantages of this arch is that you can do nested css like `a { &:hover {} }` and it'll generate them as long as the JS part is executed, which depends on the `NODE_ENV` variable right now.

To simplify,

The Adaptor right now needs the `NODE_ENV !== "production"` and you will have to configure your bundler to handle that env variable. Once done, everytime the JS executes it'll make requests to the stone-cli to generate the requested `.css` file.

It is recommended to use a different `css` file just for stone and not combine it with your own manual css files to avoid any overriding of styles that the generated css might do.

#### Disadvantages

The problem though is that there's no way **right now** to get the files to get generated at build time without using something like and they are only generated during development runtime as the JS adaptor makes the requests to create them, I'm still looking at ways to make this a little more seamless while keeping the adaptor approach in place.

#### Usage

```js
import { decorate, CSSWebIOAdaptor } from '@barelyhuman/stone';

const themeConfig = {
  colors: {
    base: '#ffffff',
    text: '#000000',
    button: {
      base: '#f8f9fa',
      text: '#495057',
    },
  },
  dimensions: {
    button: {
      radius: '6px',
    },
    sm: '5px',
    md: '1em',
    lg: '2rem',
    xl: '2.5rem',
  },
};

const adaptors = {
  css: CSSWebIOAdaptor({
    output: __dirname + '/demo.css',
    URL: 'http://localhost:5000/css',
  }),
};

const { colors, css } = decorate(themeConfig, adaptors);

const primaryButtonColor = colors.button.base.darker(20);

const buttonStyle = css`
  background-color: ${primaryButtonColor.value()};
  color: ${(theme) => theme.colors.button.text.darker(20).value()};
  border: 2px solid ${primaryButtonColor.value()};
  border-radius: ${(theme) =>
    theme.dimensions.button.radius.value() +
    theme.dimensions.button.radius.unit()};
  height: 32px;
  padding: 0 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(theme) => primaryButtonColor.lighter(10).value()};
  }
`;

const textStyle = css`
  color: ${(theme) => theme.colors.text.lighter(20).value()};
`;

const button = document.createElement('button');
const p = document.createElement('p');

p.innerText = 'Hello';
p.classList.add(textStyle);

button.innerText = 'Button';
button.classList.add(buttonStyle);

document.body.appendChild(button);
document.body.appendChild(p);
```
