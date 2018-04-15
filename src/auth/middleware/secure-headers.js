const { sendError } = require('../../services/errors')
const {
  API_HEADER,
  APPLICATION_JSON,
  CONTENT_TYPE_HEADER
} = require('../constants')

const secureAPIToken = (headers) => tokensList.includes(headers[API_HEADER])
const secureContentType = (headers) => headers[CONTENT_TYPE_HEADER] === APPLICATION_JSON

module.exports = (req, res, next) => {
  const pipeline = [secureAPIToken, secureContentType]
  const hasValidHeaders = pipeline.every((fn) => fn(req.headers))

  return hasValidHeaders ? next() : sendError(res).unsecure()
}
