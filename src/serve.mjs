import express from 'express'
import path from 'path'
import { parseFile } from './parser.mjs'

/**
 * Run a web server on the given port.
 *
 * @param {string} url
 * @param {string} rootDir
 * @param {function} cb
 * @return {Express}
 */
export const serve = (url, rootDir, cb) => {
  const [, port] = url.split(':')
  const app = express()

  // Serve all the *.jsx files in the root directory
  // TODO: Check the file extension before parsing
  app.get('*', async (req, res) => {
    const filename = path.join(rootDir || process.cwd(), req.url)
    res.send(await parseFile(filename))
  })

  app.listen(port, cb)

  return app
}
