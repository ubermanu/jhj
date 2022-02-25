import express from 'express'
import path from 'path'
import fs from 'fs'
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
  app.get('*', async (req, res) => {
    const u = new URL(req.url, `http://${url}`)
    const pathname = u.pathname !== '/' ? u.pathname : '/index.jsx'
    const filename = path.join(rootDir || process.cwd(), pathname)

    // Set the global `location` variable
    global.location = u

    if (!fs.existsSync(filename)) {
      res.status(404).send('Not Found')
      return
    }

    if (filename.endsWith('.jsx')) {
      res.send(await parseFile(filename))
    }
  })

  app.listen(port, cb)

  return app
}
