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

    // Sanitize the pathname to avoid directory traversal attacks
    let pathname = u.pathname
    pathname += pathname.endsWith('/') ? 'index.jsx' : ''
    pathname += pathname.endsWith('.jsx') ? '' : '.jsx'

    const filename = path.join(process.cwd(), rootDir, pathname)

    // Set the global `location` variable
    // TODO: Use a proper Location object
    global.location = u

    if (!fs.existsSync(filename)) {
      res.status(404).send('Not Found')
      return
    }

    if (filename.endsWith('.jsx')) {
      res.send(await parseFile(filename, { nocache: true }))
      return
    }

    res.sendFile(filename)
  })

  app.listen(port, cb)

  return app
}
