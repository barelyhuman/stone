import { test } from 'uvu'
import * as assert from 'uvu/assert'
import plugin from '../dist/babel'
import { transformSync } from '@babel/core'

// TODO: add fail cases for the test

const cssTemplate = `
const buttonStyle = css\`
  padding: 0 10px;
  font-size: 14px;
  line-height: 27px;
  background-color: \${(theme) => theme.colors.blue.value()};
  color: \${(theme) => theme.colors.black.value()};

  &:hover {
    background-color: \${(theme) => theme.colors.black.value()};
  }
\`;

`

test('convert css template to classname', () => {
  const syncedCode = transformSync(cssTemplate, {
    plugins: [
      [
        plugin,
        {
          themeFile: './tests/theme.stone.js'
        }
      ]
    ]
  })

  assert.equal(
    syncedCode.code,
    'import "./css-stone-0.stone.css";\nconst buttonStyle = "stone218162934";'
  )
})

test.run()
