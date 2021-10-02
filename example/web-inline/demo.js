import {
  createColors,
  createCSS,
  createDimensions,
  CSSWebInlineAdaptor
} from '../../dist/index'

const _themeConfig = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    blue: '#1971c2',
    green: '#099268'
  },
  dimensions: {
    borders: {
      sm: '4px',
      md: '8px',
      lg: '16px'
    },
    font: {
      ls: {
        size: '1px'
      }
    },
    sm: '5px',
    md: '1em',
    lg: '2rem',
    xl: '2.5rem'
  }
}

// Create usable theme elements
const colors = createColors(_themeConfig.colors)
const dimensions = createDimensions(_themeConfig.dimensions)
const alias = {
  brand: colors.blue.lighter(20),
  text: colors.white.lighter(10)
}

const themeConfig = {
  colors,
  dimensions,
  alias
}

const adaptors = {
  css: CSSWebInlineAdaptor
}

const css = createCSS(themeConfig, adaptors)

const buttonStyle = css`
  padding: 0 ${(theme) => theme.dimensions.md.raw};

  font-size: 14px;
  line-height: 27px;

  background-color: ${(theme) => theme.alias.brand.value()};
  color: ${(theme) => theme.alias.text.value()};

  border: 1px solid ${(theme) => theme.alias.brand.value()};
  border-radius: ${(theme) => theme.dimensions.borders.sm.value()}px;

  &:hover {
    border-color: ${(theme) => theme.alias.brand.darker(10).value()};
    color: ${(theme) => theme.alias.text.value()};
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px;
  }
`

const margins = css`
  margin: ${(theme) => theme.dimensions.lg.raw}}
`

const buttonPill = css`
  border-radius: ${(theme) => theme.dimensions.borders.lg.value()}px;
`

const button = document.createElement('button')
const button2 = document.createElement('button')

button.innerText = 'Button'
button2.innerText = 'Button'

Object.assign(button.style, buttonStyle)
Object.assign(button2.style, buttonStyle, buttonPill, margins)

document.body.appendChild(button)
document.body.appendChild(button2)
