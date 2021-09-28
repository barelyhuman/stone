import { CSSWebInjectAdaptor, decorate } from '../../dist/index';

const themeConfig = {
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

const { css, colors } = decorate(themeConfig, adaptors, (ctx) => {
  const { colors, dimensions } = ctx;
  ctx.alias = {
    button: {
      base: colors.base.darker(10),
      text: colors.text.lighter(20),
      radius: dimensions.sm,
      hoverBG: colors.base.darker(20),
    },
  };
});

const buttonStyle = css`
  background-color: ${(theme) => {
    console.log({ theme });
    return theme.alias.button.base.value();
  }};
  color: ${(theme) => theme.alias.button.text.value()};
  border: 2px solid ${(theme) => theme.alias.button.base.value()};
  border-radius: ${(theme) =>
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
    background: ${(theme) => theme.alias.button.hoverBG.value()};
    border-color: ${(theme) => theme.alias.button.hoverBG.value()};
  }
`;

const button = document.createElement('button');

button.innerText = 'Button';
button.classList.add(buttonStyle);

document.body.appendChild(button);
