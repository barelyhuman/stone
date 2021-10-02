import {
  createColors,
  createCSS,
  createDimensions,
  CSSWebIOAdaptor
} from '../../dist/index'
import path from 'path'

const themeConfig = {
  colors: {
    base: '#ffffff',
    text: '#000000',
    button: {
      base: '#f8f9fa',
      text: '#495057'
    }
  },
  dimensions: {
    button: {
      radius: '6px'
    },
    sm: '5px',
    md: '1em',
    lg: '2rem',
    xl: '2.5rem'
  }
}

const colors = createColors(themeConfig.colors)
const dimensions = createDimensions(themeConfig.dimensions)

const adaptors = {
  css: CSSWebIOAdaptor({
    output: path.join(__dirname, '/demo.css'),
    URL: 'http://localhost:5000/css'
  })
}

const css = createCSS(
  {
    colors,
    dimensions
  },
  adaptors
)

const primaryButtonColor = colors.button.base.darker(20)

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
`

const textStyle = css`
  color: ${(theme) => theme.colors.text.lighter(20).value()};
`

const button = document.createElement('button')
const p = document.createElement('p')

p.innerText = 'Hello'
p.classList.add(textStyle)

button.innerText = 'Button'
button.classList.add(buttonStyle)

document.body.appendChild(button)
document.body.appendChild(p)
