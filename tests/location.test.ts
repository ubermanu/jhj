import { test } from 'uvu'
import * as assert from 'uvu/assert'
import Location from '../src/location'

test('assign from url string', async () => {
  const location = new Location()
  location.assign('http://localhost:8000/foo/bar?baz=qux#quux')

  assert.equal(location.protocol, 'http:')
  assert.equal(location.host, 'localhost:8000')
  assert.equal(location.hostname, 'localhost')
  assert.equal(location.port, '8000')
  assert.equal(location.pathname, '/foo/bar')
  assert.equal(location.search, '?baz=qux')
  assert.equal(location.hash, '#quux')
  assert.equal(location.origin, 'http://localhost:8000')
})

test('transform to string', async () => {
  const url = 'https://domain.com/path/to/file.html?foo=bar#baz'
  const location = new Location()
  location.assign(url)

  assert.equal(location.href, url)
  assert.equal(location.toString(), url)
})

test.run()
