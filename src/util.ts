import { readFile } from 'fs/promises'
import dayjs from 'dayjs'

/**
 * Read a JSON file and parse it.
 *
 * @param {string} filename
 * @return {Promise<any>}
 */
export const json = async (filename) => {
  return JSON.parse(await readFile(new URL(filename, import.meta.url), 'utf8'))
}

/**
 * Return the current date with a decent format.
 *
 * @return {string}
 */
export const now = () => {
  return dayjs().format('ddd MMM DD HH:mm:ss YYYY')
}
