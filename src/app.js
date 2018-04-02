const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const operations = require('./operations')

app.use(bodyParser.json())
app.use('/operations', operations)

module.exports = function startup () {
  return app.listen(1337)
}
