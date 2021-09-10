import { CSSWebInlineAdaptor, decorate } from "../dist/index";

const themeConfig = {
  colors: {
    base: "#ffffff",
    text: "#000000",
    button: {
      base: "#000000",
      text: "#ffffff",
      hover: "#ffffff",
    },
  },
  dimensions: {
    button: {
      radius: "2px",
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
  background-color: ${(theme) => theme.colors.button.base.lighter(50).value()};
  color: ${(theme) => theme.colors.button.text.value()};
  border: 2px solid rgba(12, 12, 13, 0.1);
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
  border-color: #000;
  outline: #000;
  color: #000;
  background: #fff;
`;

console.log(buttonStyle);

const button = document.createElement("button");

button.innerText = "Button";
Object.assign(button.style, buttonStyle);

button.addEventListener("mouseover", () => {
  Object.assign(button.style, buttonStyleHover);
});

button.addEventListener("mouseout", () => {
  Object.assign(button.style, buttonStyle);
});

document.body.appendChild(button);
