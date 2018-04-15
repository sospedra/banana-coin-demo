const express = require('express')
const monitor = require('express-status-monitor')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const { createVersion, unsupportedVersion } = require('./services/versions')
const { errorMiddleware, missingMiddleware } = require('./services/errors')
const { generateDocs } = require('./services/blueprint')
const bananaCoin = require('./banana-coin')
const auth = require('./auth')

const PORT = 1337
const app = express()

/** First server middlewares */
app.use(monitor())
app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(auth.middleware.secureHeaders)

/** Legacy Routes */
app.use('/v1', createVersion((version) => {
  version.use(bananaCoin.path, auth.middleware.authorization, bananaCoin.v1)
}))
app.use('/v*', unsupportedVersion())

/** Current Routes */
app.use(auth.path, auth.current)
app.use(bananaCoin.path, auth.middleware.authorization, bananaCoin.current)
app.get('/docs', generateDocs([bananaCoin.blueprint]))

/** Last server middlewares */
app.use(auth.middleware.secureOutput)
app.use(missingMiddleware)
app.use(errorMiddleware)

module.exports = function startup () {
  return app.listen(PORT, () => console.log(`
    Banana Coin 🍌

    Successful server startup
    Running at http://localhost:${PORT}
  `))
}
