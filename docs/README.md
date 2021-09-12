# Documentation

Stone is simple framework agnostic , theme based **css-in-js** library. Due to the nature of the library the documentation is a bit dense, do go through the implementations as much as you can or head to the issues to report things that you think needs fixing.

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
import { CSSWebInlineAdaptor, decorate } from "@barelyhuman/stone";

const themeConfig = {
  colors: {
    base: "#ffffff",
    text: "#000000",
    button: {
      base: "#f8f9fa",
      text: "#495057",
    },
  },
  dimensions: {
    button: {
      radius: "6px",
    },
    sm: "5px",
    md: "1em",
    lg: "2rem",
    xl: "2.5rem",
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

const button = document.createElement("button");

button.innerText = "Button";
button.classList.add(buttonStyle);

button.addEventListener("mouseover", () => {
  button.classList.add(buttonStyleHover);
});

button.addEventListener("mouseout", () => {
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
import { CSSWebInjectAdaptor, decorate } from "../dist/index";

const themeConfig = {
  colors: {
    base: "#ffffff",
    text: "#000000",
    button: {
      base: "#f8f9fa",
      text: "#495057",
    },
  },
  dimensions: {
    button: {
      radius: "6px",
    },
    sm: "5px",
    md: "1em",
    lg: "2rem",
    xl: "2.5rem",
  },
};

const adaptors = {
  css: CSSWebInjectAdaptor,
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

const button = document.createElement("button");

button.innerText = "Button";
button.classList.add(buttonStyle);

button.addEventListener("mouseover", () => {
  button.classList.add(buttonStyleHover);
});

button.addEventListener("mouseout", () => {
  button.classList.remove(buttonStyleHover);
});

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
import { decorate, CSSWebIOAdaptor } from "../../dist";

const themeConfig = {
  colors: {
    base: "#ffffff",
    text: "#000000",
    button: {
      base: "#f8f9fa",
      text: "#495057",
    },
  },
  dimensions: {
    button: {
      radius: "6px",
    },
    sm: "5px",
    md: "1em",
    lg: "2rem",
    xl: "2.5rem",
  },
};

const adaptors = {
  css: CSSWebIOAdaptor({
    output: __dirname + "/demo.css",
    URL: "http://localhost:5000/css",
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

const button = document.createElement("button");
const p = document.createElement("p");

p.innerText = "Hello";
p.classList.add(textStyle);

button.innerText = "Button";
button.classList.add(buttonStyle);

document.body.appendChild(button);
document.body.appendChild(p);
```
