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
`;

const buttonStyleHover = css`
  outline: #000;
  color: #000;
  background: ${primaryButtonColor.lighter(10).value()};
  border-color: ${(theme) => theme.colors.button.base.darker(10).value()};
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
