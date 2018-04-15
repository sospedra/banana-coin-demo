const PrettyError = require('pretty-error')
const pe = new PrettyError()

pe.skipNodeFiles()
pe.skipPackage('express')

/**
 * Return the supported list of errors ready to be call
 * @param {Object} res - Express res instance
 *  @param {Func} res.status
 *  @param {Func} res.send
 * @return {Object} errors - Collection of supported errors calls
 */
const sendError = module.exports.sendError = (res) => ({
  badCredentials: () => res.status(401).send({ error: 'Bad auth credentials' }),
  critical: () => res.status(500).send({ error: 'Unknown internal critical error' }),
  missing: () => res.status(404).send({ error: 'Route not found. And never been here' }),
  unauth: () => res.status(401).send({ error: 'Missing or invalid Authorization header' }),
  unsecure: () => res.status(401).send({ error: 'Missing or invalid API token' }),
  version: () => res.status(404).send({ error: 'Unsupported version number' })
})

/**
 * Listen to all unhandled errors that happened both inside the routes and middlewares
 * If triggered bailout the pipe sending a 500 error
 *
 * @param  {Error} err
 * @param  {Object} req - Express req instance
 * @param  {Object} res - Express res instance
 */
module.exports.errorMiddleware = (err, req, res) => {
  process.stderr.write(pe.render(err))
  return sendError(res).critical()
}

/**
 * Listen to missing routes if any
 * If triggered bailout the pipe sending a 404 error
 * @param  {Object} req - Express req instance
 * @param  {Object} res - Express res instance
 */
module.exports.missingMiddleware = (req, res) => {
  return sendError(res).missing()
}
