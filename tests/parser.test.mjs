import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { importStr, parseFile, parseString } from '../src/parser.mjs'

test('normal import', async () => {
  assert.ok(await importStr('export default "hello world"'))
})

test('import with a question mark in source code', async () => {
  assert.ok(await importStr('export default "?"'))
})

test('parse jsx string', async () => {
  assert.ok(await parseString('<div>hello world</div>'))
})

test('parse jsx file', async () => {
  assert.ok(await parseFile('tests/_files/example.jsx'))
})

test.run()
