import { CSSWebInlineAdaptor, decorate } from "../../dist/index";

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