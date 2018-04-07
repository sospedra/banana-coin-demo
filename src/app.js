const express = require('express')
const monitor = require('express-status-monitor')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const bananaCoin = require('./banana-coin')
const auth = require('./auth')
const { authMiddleware, securizationMiddleware } = require('./auth/middleware')
const { errorMiddleware } = require('./services/errors')

const PORT = 1337
const app = express()

app.use(monitor())
app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(securizationMiddleware)
app.use('/auth', auth)
app.use('/banana-coin', authMiddleware, bananaCoin)
app.use(errorMiddleware)

module.exports = function startup () {
  return app.listen(PORT, () => console.log(`
    Banana Coin 🍌

    Successful server startup
    Running at http://localhost:${PORT}
  `))
}
