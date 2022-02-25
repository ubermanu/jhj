import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { importStr } from '../src/parser.mjs'

test('normal import', async () => {
  assert.ok(await importStr('export default "hello world"'))
})

test('import with a question mark in source code', async () => {
  assert.ok(await importStr('export default "?"'))
})

test.run()
