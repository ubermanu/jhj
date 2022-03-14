/**
 * Location polyfill for the JHJ interpreter.
 */
export default class Location {
  /**
   * @type DOMStringList
   * @readonly
   */
  ancestorOrigins

  /**
   * @type string
   */
  hash

  /**
   * @type string
   */
  host

  /**
   * @type string
   */
  hostname

  /**
   * @type string
   */
  href

  /**
   * @type string
   */
  origin

  /**
   * @type string
   */
  pathname

  /**
   * @type string
   */
  port

  /**
   * @type string
   */
  protocol

  /**
   * @type string
   */
  search

  /**
   * @param {string|URL} url
   * @returns {void}
   */
  assign(url) {
    const u = new URL(url)
    this.hash = u.hash
    this.host = u.host
    this.hostname = u.hostname
    this.href = u.href
    this.origin = u.origin
    this.pathname = u.pathname
    this.port = u.port
    this.protocol = u.protocol
    this.search = u.search
    this.ancestorOrigins = new DOMStringList()
  }

  /**
   * @returns {void}
   */
  reload() {}

  /**
   * @param {string|URL} url
   * @returns {void}
   */
  replace(url) {
    this.assign(url)
  }

  /**
   * @returns {string}
   */
  toString() {
    return this.href
  }
}

export class DOMStringList extends Array {
  /**
   * @param {string} string
   * @return {boolean}
   */
  contains(string) {
    return false
  }

  /**
   * @param {number} index
   * @returns {string|null}
   */
  item(index) {
    return null
  }
}
