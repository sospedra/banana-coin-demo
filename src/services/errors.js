const PrettyError = require('pretty-error')
const pe = new PrettyError()

pe.skipNodeFiles()
pe.skipPackage('express')

module.exports.errorMiddleware = (err, req, res, next) => {
  process.stderr.write(pe.render(err))
  res.status(500)
}

module.exports.sendError = (res) => ({
  badCredentials: () => res.status(401).send({ message: 'Bad auth credentials' }),
  unauth: () => res.status(401).send({ message: 'Missing or invalid AUTH token' }),
  unsecure: () => res.status(401).send({ message: 'Missing or invalid API token' })
})
