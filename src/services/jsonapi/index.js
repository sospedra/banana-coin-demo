const { defaultTo } = require('lodash')

const replacePageNumber = (route, number) => (replacement) => {
  return route.replace(`page[number]=${number}`, `page[number]=${replacement}`)
}

/**
 * Create a JSON API Response
 * Has to be compliant with the spec
 * Uses JSON parse/stringify to rip possible unvalid JSON data types
 * In case of failure let it bubble to the top
 *
 * @param  {String} type
 * @param  {Any} attributes
 * @param  {Number} [id]
 * @return {Object}
 */
module.exports.createJAR = (type, attributes, id) => {
  const response = { type, attributes, id }
  return JSON.parse(JSON.stringify(response))
}

/**
 * Safely get the number and size attributes from query object
 *
 * @param  {Object} [query={page: {}}]
 * @return {Object} response
 *  @return {Number} [response.number=0]
 *  @return {Number} [response.size=1]
 */
module.exports.getPageFromQuery = (query = { page: {} }) => ({
  number: defaultTo(parseInt(query.page.number), 0),
  size: defaultTo(parseInt(query.page.size), 1)
})

/**
 * Generate JSON API links object
 * Given an express request, number page and last page value
 *
 * @param  {Object} [req={}] - Express req instance
 * @param  {Number} number - Current page
 * @param  {Number} lastPage
 * @return {Object} response
 *  @return {String} response.first
 *  @return {String} response.last
 *  @return {String} response.next
 *  @return {String} response.prev
 *  @return {String} response.self
 */
module.exports.createLinks = (req = {}, number, lastPage) => {
  const hasPrev = number > 0
  const hasNext = number < lastPage
  const originalRoute = decodeURIComponent([
    `${req.protocol}://`,
    req.get('host'),
    req.originalUrl
  ].join(''))
  const replacer = replacePageNumber(originalRoute, number)

  return {
    first: replacer(0),
    last: replacer(lastPage),
    next: hasNext && replacer(number + 1),
    prev: hasPrev && replacer(number - 1),
    self: originalRoute
  }
}
