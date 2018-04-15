const jwt = require('jsonwebtoken')

const { sendError } = require('../../services/errors')
const { AUTH_HEADER, SECRET } = require('../constants')

module.exports = (req, res, next) => {
  const token = req.headers[AUTH_HEADER]

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return sendError(res).unauth()

    // share with all the routes
    req.auth = decoded
    // proceed!
    next()
  })
}
