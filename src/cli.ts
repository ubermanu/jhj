import minimist from 'minimist'
import chalk from 'chalk'

import { parseFile, parseString } from './parser'
import { json } from './util'
import { serve } from './server'

/**
 * @type {{_: [], f?: string, r?: string, version?: boolean, v?:boolean, help?: boolean, h?: boolean, S?: string, t?: string}}
 */
const options = minimist(process.argv.slice(2))

if (options.version || options.v) {
  json('../package.json').then(({ version }) => {
    console.log('JHJ', chalk.yellow(version), '(cli)')
    process.exit(0)
  })
}

const help = `Usage: jhj [options] -f <file>
   jhj [options] -r <code>
   jhj [options] -S <addr>:<port> [-t docroot] [router]

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
  parseFile(options.f).then((res) => {
    console.log(res)
    process.exit(0)
  })
}

if (options.r) {
  parseString(options.r).then((res) => {
    console.log(res)
    process.exit(0)
  })
}

if (options.S) {
  serve(options.S, options.t, options._[0])
} else {
  console.log(help)
  process.exit(0)
}
