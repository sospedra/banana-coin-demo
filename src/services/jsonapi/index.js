const { defaultTo } = require('lodash')

const replacePageNumber = (route, number) => (replacement) => {
  return route.replace(`page[number]=${number}`, `page[number]=${replacement}`)
}

module.exports.getPageFromQuery = (query = { page: {} }) => ({
  number: defaultTo(parseInt(query.page.number), 0),
  size: defaultTo(parseInt(query.page.size), 1)
})

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
    self: originalRoute,
    first: replacer(0),
    prev: hasPrev && replacer(number - 1),
    next: hasNext && replacer(number + 1),
    last: replacer(lastPage)
  }
}
