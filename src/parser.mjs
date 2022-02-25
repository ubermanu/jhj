import React from 'react'
import babel from '@babel/core'
import { renderToString } from 'react-dom/server.js'

// Set React as global
// So it can be called from the esmLoader
global.React = React

const babelOptions = {
  plugins: ['@babel/plugin-transform-react-jsx'],
  comments: false,
}

/**
 * Import an ES6 module using its source code, rather than a URL.
 * @param string
 * @return {Promise<*>}
 */
export const importStr = (string) => import(`data:text/javascript,${string}`)

/**
 * Parse a *.jsx file and return the default export.
 *
 * @param {string} filename
 * @return {Promise<*>}
 */
export const parseFile = async (filename) => {
  const { code } = await babel.transformFileAsync(filename, babelOptions)
  const { default: result } = await importStr(code)
  return renderToString(result)
}

/**
 * Parse a *.jsx string.
 *
 * @param string
 * @return {Promise<*>}
 */
export const parseString = async (string) => {
  const { code } = await babel.transformAsync(string, babelOptions)
  return renderToString(eval(code))
}
