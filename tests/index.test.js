import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { createColors } from '../dist'
import { normalizeHex } from '../dist/lib/utils'

const theme = {
  colors: createColors({
    base: '#faf4ed',
    text: '#575279'
  })
}

test('Lighten color hex', () => {
  const targetHex = normalizeHex('#6b6695')
  const convertedVal = theme.colors.text.lighter(10).value()
  assert.equal(normalizeHex(convertedVal), targetHex)
})

test('Darken color hex', () => {
  const targetHex = normalizeHex('#403c59')
  const convertedVal = theme.colors.text.darker(10).value()
  assert.equal(normalizeHex(convertedVal), targetHex)
})

test.run()
