import minimist from 'minimist'
import { parseFile, parseString } from './parser.mjs'
import { serve } from './server.mjs'
import { json } from './util.mjs'

/**
 * @type {{_: [], f?: string, r?: string, version?: boolean, v?:boolean, help?: boolean, h?: boolean, S?: string, t?: string}}
 */
const options = minimist(process.argv.slice(2))

if (options.version || options.v) {
  const { version } = await json('../package.json')
  console.log('JHJ', version, '(cli)')
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
  console.log(await parseFile(options.f))
  process.exit(0)
}

if (options.r) {
  console.log(await parseString(options.r))
  process.exit(0)
}

if (options.S) {
  serve(options.S, options.t)
} else {
  console.log(help)
  process.exit(0)
}
