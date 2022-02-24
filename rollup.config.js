import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/cli.mjs',
  output: {
    file: 'dist/jhj.js',
    sourcemap: false,
  },
  plugins: [nodeResolve(), terser()],
}
