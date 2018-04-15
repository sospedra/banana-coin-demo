const express = require('express')
const monitor = require('express-status-monitor')
const morgan = require('morgan')
const helmet = require('helmet')

const { generateDocs } = require('./services/blueprint')
const bananaCoin = require('./banana-coin')
const api = require('./api')

const PORT = 1337
const app = express()

/** Server config */
app.use(monitor())
app.use(helmet())
app.use(morgan('tiny'))
/** Server routes */
app.use('/api', api)
app.get('/docs', generateDocs([bananaCoin.blueprint]))

module.exports = function startup () {
  return app.listen(PORT, () => console.log(`
    Banana Coin 🍌

    Successful server startup
    Running at http://localhost:${PORT}
  `))
}
