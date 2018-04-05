const jwt = require('jsonwebtoken')
const { HEADER, SECRET } = require('./constants')

module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers[HEADER]

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Missing or invalid token' })
    }

    // share with all the routes
    req.auth = decoded
    // proceed!
    next()
  })
}
