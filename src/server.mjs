import express from 'express'
import path from 'path'
import fs from 'fs'
import { parseFile } from './parser.mjs'
import { json, now } from './util.mjs'

/**
 * Run a web server on the given port.
 *
 * @param {string} url
 * @param {string} rootDir
 * @return {Express}
 */
export const serve = (url, rootDir) => {
  const [, port] = url.split(':')
  const app = express()

  // Middleware to log requests.
  // TODO: Add colors and status message if any
  app.use((req, res, next) => {
    console.log(`[${now()}] [${res.statusCode}]: ${req.method} ${req.url}`)
    next()
  })

  // Serve all the *.jsx files in the root directory
  app.get('*', async (req, res) => {
    const u = new URL(req.url, `http://${url}`)

    // Sanitize the pathname to avoid directory traversal attacks
    let pathname = u.pathname
    pathname += pathname.endsWith('/') ? 'index.jsx' : ''

    const filename = path.join(process.cwd(), rootDir || '', pathname)

    // Set the global `location` variable
    // TODO: Use a proper Location object
    global.location = u

    if (!fs.existsSync(filename)) {
      res.status(404).send()
      return
    }

    if (filename.endsWith('.jsx')) {
      res.send(await parseFile(filename, { nocache: true }))
      return
    }

    res.sendFile(filename)
  })

  app.listen(port, async () => {
    const { version } = await json('../package.json')
    console.log(
      `[${now()}] JHJ ${version} Development Server (http://${url}) started`
    )
  })

  return app
}
