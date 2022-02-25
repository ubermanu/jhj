import minimist from 'minimist'
import { parseFile, parseString } from './parser.mjs'
import { readFile } from 'fs/promises'
import { serve } from './server.mjs'

/**
 * Read a JSON file and parse it.
 *
 * @param {string} filename
 * @return {Promise<any>}
 */
const json = async (filename) => {
  return JSON.parse(await readFile(new URL(filename, import.meta.url), 'utf8'))
}

/**
 * @type {{_: [], f?: string, r?: string, version?: boolean, v?:boolean, help?: boolean, h?: boolean, S?: string, t?: string}}
 */
const options = minimist(process.argv.slice(2))

if (options.version || options.v) {
  const pkg = await json('../package.json')
  console.log('JHJ', pkg.version, '(cli)')
  process.exit(0)
}

const help = `Usage: jhj [options] -f <file>
   jhj [options] -r <code>
   jhj [options] -S <addr>:<port> [-t docroot]

  -f <file>        Parse and execute <file>
  -h               This help
  -r <code>        Run JSX <code> without using a default export
  -S <addr>:<port> Run with built-in web server
  -t <docroot>     Specify document root <docroot> for built-in web server
  -v               Version number
`

if (options.help || options.h) {
  console.log(help)
  process.exit(0)
}

if (options.f) {
  const html = await parseFile(options.f)
  console.log(html)
  process.exit(0)
}

if (options.r) {
  const html = await parseString(options.r)
  console.log(html)
  process.exit(0)
}

if (options.S) {
  const pkg = await json('../package.json')
  const now = new Date()
  serve(options.S, options.t || '', () => {
    console.log(
      `[${now}] JHJ ${pkg.version} Development Server (http://${options.S}) started`
    )
  })
}
