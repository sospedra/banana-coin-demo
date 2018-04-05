const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const bananaCoin = require('./banana-coin')
const auth = require('./auth')
const { authMiddleware } = require('./auth/middleware')
const { errorMiddleware } = require('./services/errors')

app.use(bodyParser.json())
app.use('/auth', auth)
app.use('/banana-coin', authMiddleware, bananaCoin)
app.use(errorMiddleware)

module.exports = function startup () {
  return app.listen(1337)
}
