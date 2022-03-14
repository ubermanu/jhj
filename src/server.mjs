import express from 'express'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { parseFile } from './parser.mjs'
import { json, now } from './util.mjs'
import Location from './location.mjs'

/**
 * Run a web server on the given port.
 *
 * @param {string} host
 * @param {string} rootDir
 * @return {Express}
 */
export const serve = (host, rootDir) => {
  const [, port] = host.split(':')
  const app = express()

  // Middleware to log requests.
  app.use((req, res, next) => {
    res.on('finish', () => {
      console.log(
        `[${now()}] [${statusColor(res.statusCode)}]: ${req.method} ${req.url}`
      )
    })
    next()
  })

  // Serve all the *.jsx files in the root directory
  app.get('*', async (req, res) => {
    const url = new URL(req.url, `http://${host}`)

    // Sanitize the pathname to avoid directory traversal attacks
    let pathname = url.pathname
    pathname += pathname.endsWith('/') ? 'index.jsx' : ''

    const filename = path.join(process.cwd(), rootDir || '', pathname)

    // Set the global `location` variable
    global.location = new Location()
    global.location.assign(url)

    if (!fs.existsSync(filename)) {
      res.sendStatus(404)
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
      `[${now()}] JHJ ${version} Development Server (http://${host}) started`
    )
  })

  return app
}

/**
 * Add color to the status code.
 *
 * @param statusCode
 * @return {*}
 */
function statusColor(statusCode) {
  if (statusCode >= 500) return chalk.red(statusCode)
  if (statusCode >= 400) return chalk.red(statusCode)
  if (statusCode >= 300) return chalk.yellow(statusCode)
  if (statusCode >= 200) return chalk.green(statusCode)
  return statusCode
}
