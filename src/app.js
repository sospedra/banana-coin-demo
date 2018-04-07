const express = require('express')
const monitor = require('express-status-monitor')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const bananaCoin = require('./banana-coin')
const auth = require('./auth')
const { authMiddleware, securizationMiddleware } = require('./auth/middleware')
const { createVersion } = require('./services/versions')
const { errorMiddleware } = require('./services/errors')

const PORT = 1337
const app = express()

/** First server middlewares */
app.use(monitor())
app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(securizationMiddleware)

/** Legacy Routes */
app.use('/v1', createVersion((version) => {
  version.use(bananaCoin.path, bananaCoin.v1)
}))

/** Current Routes */
app.use(auth.path, auth.current)
app.use(bananaCoin.path, authMiddleware, bananaCoin.current)

/** Last server middlewares */
app.use(errorMiddleware)

module.exports = function startup () {
  return app.listen(PORT, () => console.log(`
    Banana Coin 🍌

    Successful server startup
    Running at http://localhost:${PORT}
  `))
}
