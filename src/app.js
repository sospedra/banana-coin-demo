const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const bananaCoin = require('./banana-coin')

app.use(bodyParser.json())
app.use('/banana-coin', bananaCoin)

module.exports = function startup () {
  return app.listen(1337)
}
