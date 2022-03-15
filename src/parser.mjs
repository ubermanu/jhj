import React from 'react'
import babel from '@babel/core'
import { renderToString } from 'react-dom/server.js'

// Set React as global
// So it can be called from the esmLoader
global.React = React

const babelOptions = {
  plugins: ['@babel/plugin-transform-react-jsx'],
  comments: false,
  sourceMaps: 'inline',
}

/**
 * Import an ES6 module using its source code, rather than a URL.
 *
 * @param string
 * @return {Promise<*>}
 */
export const importStr = (string) => {
  return import(
    `data:text/javascript;base64,${Buffer.from(string).toString('base64')}`
  )
}

/**
 * Increment id counter for the cache option.
 * See `parseFile` for more information.
 *
 * @type {number}
 */
let cacheIncrementIdCounter = 0

/**
 * Parse a *.jsx file and return the default export.
 * Add a unique ID to not cache the module if defined so.
 *
 * @param {string} filename
 * @param {{nocache?: boolean}} options
 * @return {Promise<*>}
 */
export const parseFile = async (filename, options = {}) => {
  let { code } = await babel.transformFileAsync(filename, babelOptions)

  // Add a unique id to our code to not cache it
  if (options.nocache) {
    code += `;"${cacheIncrementIdCounter++}";`
  }

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
