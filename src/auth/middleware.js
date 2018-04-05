const jwt = require('jsonwebtoken')
const { AUTH_HEADER, API_HEADER, SECRET } = require('./constants')
const tokensList = require('./tokens')

module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers[AUTH_HEADER]

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Missing or invalid Auth token' })
    }

    // share with all the routes
    req.auth = decoded
    // proceed!
    next()
  })
}

module.exports.securizationMiddleware = (req, res, next) => {
  const token = req.headers[API_HEADER]

  return tokensList.includes(token) ? next() : res.status(401).send({ message: 'Missing or invalid API token' })
}
