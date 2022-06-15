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
 * @param {?string} routerFile
 * @return {Express}
 */
export const serve = async (host, rootDir, routerFile = null) => {
  const [hostname, port] = host.split(':')
  const app = express()
  const middlewares = []

  // Add user-defined router support
  if (routerFile) {
    const routerMod = await import(path.resolve(process.cwd(), routerFile))
    middlewares.push(routerMod.default)
  }

  // Log requests in a fancy way
  middlewares.push((req, res, next) => {
    res.on('finish', () => {
      // prettier-ignore
      console.log(`[${now()}] [${statusColor(res.statusCode)}]: ${req.method} ${req.url}`)
    })
    next()
  })

  // Serve all the *.jsx files in the root directory
  middlewares.push(async (req, res) => {
    const url = new URL(req.url, `http://${hostname}:${port}`)

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

    // Add redirect support
    // FIXME: Throws a warning because the response already has been sent
    global.location.replace = (url) => {
      res.write(`<script>location.replace("${url}")</script>`)
    }

    if (filename.endsWith('.jsx')) {
      res.send(await parseFile(filename, { nocache: true }))
      return
    }

    res.sendFile(filename)
  })

  app.use(middlewares)

  app.listen(+port, hostname, async () => {
    const { version } = await json('../package.json')
    // prettier-ignore
    console.log(`[${now()}] JHJ ${chalk.yellow(version)} Development Server (http://${hostname}:${port}) started`)
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
