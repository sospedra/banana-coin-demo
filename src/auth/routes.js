const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const repository = require('../services/repository')(__dirname, 'db.json')
const { promisify } = require('../services/router')
const { sendError } = require('../services/errors')
const { createJAR } = require('../services/jsonapi')
const { ALGORITHM, EXPIRE_TIME, SECRET } = require('./constants')

/**
 * signin - Check credentials and return valid token
 */
module.exports.signin = promisify(async (req, res) => {
  const { username, password } = req.body
  const hash = crypto.createHash(ALGORITHM).update(password).digest('hex')
  const token = jwt.sign({ username }, SECRET, { expiresIn: EXPIRE_TIME })
  const user = await repository.getByID(username)

  return user.password === hash
    ? res.send(createJAR('auth-token', token))
    : sendError(res).badCredentials()
})

module.exports.signin.verb = 'post'
module.exports.signin.path = '/signin'
