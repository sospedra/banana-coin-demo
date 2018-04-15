const { sendError } = require('../../services/errors')
const {
  API_HEADER,
  APPLICATION_JSON,
  CONTENT_TYPE_HEADER
} = require('../constants')
const tokensList = require('../tokens')

const secureAPIToken = (headers) => tokensList.includes(headers[API_HEADER])
const secureContentType = (headers) => headers[CONTENT_TYPE_HEADER] === APPLICATION_JSON

module.exports = (req, res, next) => {
  const errors = sendError(res)

  if (!secureAPIToken(req.headers)) return errors.unsecureAPI()
  if (!secureContentType(req.headers)) return errors.unsecureType()

  next()
}
