const { sendError } = require('../../services/errors')
const {
  APPLICATION_JSON,
  CONTENT_LENGTH_HEADER,
  CONTENT_TYPE_HEADER
} = require('../constants')

const secureOutputContentType = (res) => res.set(CONTENT_TYPE_HEADER, APPLICATION_JSON)
const secureOutputContentLength = (res) => res.set(CONTENT_LENGTH_HEADER, res.body.length)

module.exports.secureOutputMiddleware = (req, res, next) => {
  secureOutputContentType(res)
  secureOutputContentLength(res)
  next()
}
