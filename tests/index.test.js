import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { decorate } from '../src'
import { normalizeHex } from '../src/lib/utils'

const themeConfig = {
  colors: {
    base: '#faf4ed',
    text: '#575279'
  }
}

const theme = decorate(themeConfig)

test('Lighten color hex', () => {
  const targetHex = normalizeHex('#6b6695')
  const convertedVal = theme.colors.text.lighter(10).value()
  assert.equal(normalizeHex(convertedVal), targetHex)
})

test('Darken color hex', () => {
  const targetHex = normalizeHex('#565276')
  const convertedVal = theme.colors.text.darker(10).value()
  assert.equal(normalizeHex(convertedVal), targetHex)
})

test.run()
