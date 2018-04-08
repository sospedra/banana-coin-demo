const PrettyError = require('pretty-error')
const pe = new PrettyError()

pe.skipNodeFiles()
pe.skipPackage('express')

const sendError = module.exports.sendError = (res) => ({
  badCredentials: () => res.status(401).send({ message: 'Bad auth credentials' }),
  critical: () => res.status(500).send({ messgae: 'Unknown internal critical error' }),
  unauth: () => res.status(401).send({ message: 'Missing or invalid Authorization header' }),
  unsecure: () => res.status(401).send({ message: 'Missing or invalid API token' })
})

module.exports.errorMiddleware = (err, req, res) => {
  process.stderr.write(pe.render(err))
  sendError(res).critical()
}
