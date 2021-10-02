import {
  createColors,
  createCSS,
  createDimensions,
  CSSWebInjectAdaptor,
} from "../../dist/index";

const _themeConfig = {
  colors: {
    black: "#000000",
    white: "#ffffff",
    blue: "#1971c2",
    green: "#099268",
  },
  dimensions: {
    borders: {
      sm: "4px",
      md: "8px",
      lg: "16px",
    },
    font: {
      ls: {
        size: "1px",
      },
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

const colors = createColors(_themeConfig.colors);
const dimensions = createDimensions(_themeConfig.dimensions);
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

type StoneThemeConfig = typeof themeConfig;

const buttonStyle = css`
  padding: 0 ${(theme: StoneThemeConfig) => theme.dimensions.md.raw};

  font-size: 14px;
  line-height: 27px;

  background-color: ${(theme: StoneThemeConfig) => theme.alias.brand.value()};
  color: ${(theme: StoneThemeConfig) => theme.alias.text.value()};

  border: 1px solid ${(theme: StoneThemeConfig) => theme.alias.brand.value()};
  border-radius: ${(theme: StoneThemeConfig) =>
    theme.dimensions.borders.sm.value()}px;

  &:hover {
    border-color: ${(theme: StoneThemeConfig) =>
      theme.alias.brand.darker(10).value()};
    color: ${(theme: StoneThemeConfig) => theme.alias.text.value()};
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px;
  }
`;

// or do something overly complex
const margins = css`
  ${(theme: StoneThemeConfig) => {
    let classes = ``;
    const keys = ["sm", "md", "lg"];
    keys.forEach((key) => {
      classes += `&.m-${key}{margin:${theme.dimensions[
        key
      ].value()}${theme.dimensions[key].unit()}}`;
    });

    return classes;
  }}
`;

const buttonPill = css`
  border-radius: ${(theme: StoneThemeConfig) =>
    theme.dimensions.borders.lg.value()}px;
`;

const button = document.createElement("button");
const button2 = document.createElement("button");

button.innerText = "Button";
button2.innerText = "Button";

button.classList.add(buttonStyle);

button2.classList.add(buttonStyle);
button2.classList.add(buttonPill);
button2.classList.add(margins);
button2.classList.add("m-md");

document.body.appendChild(button);
document.body.appendChild(button2);
