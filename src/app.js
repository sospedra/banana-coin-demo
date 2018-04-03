const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const bananaCoin = require('./banana-coin')
const { errorMiddleware } = require('./services/errors')

app.use(bodyParser.json())
app.use('/banana-coin', bananaCoin)
app.use(errorMiddleware)

module.exports = function startup () {
  return app.listen(1337)
}
