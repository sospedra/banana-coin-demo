const express = require('express')
const bodyParser = require('body-parser')

const { createVersion, unsupportedVersion } = require('./services/versions')
const { errorMiddleware, missingMiddleware } = require('./services/errors')
const bananaCoin = require('./banana-coin')
const auth = require('./auth')

const app = module.exports = express()

/** First server middlewares */
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

/** Last server middlewares */
app.use(auth.middleware.secureOutput)
app.use(missingMiddleware)
app.use(errorMiddleware)
