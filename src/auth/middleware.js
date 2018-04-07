const jwt = require('jsonwebtoken')

const { sendError } = require('../services/errors')
const { AUTH_HEADER, API_HEADER, SECRET } = require('./constants')
const tokensList = require('./tokens')

module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers[AUTH_HEADER]

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return sendError(res).unauth()

    // share with all the routes
    req.auth = decoded
    // proceed!
    next()
  })
}

module.exports.securizationMiddleware = (req, res, next) => {
  const token = req.headers[API_HEADER]

  return tokensList.includes(token) ? next() : sendError(res).unsecure()
}
