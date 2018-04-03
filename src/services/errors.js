const PrettyError = require('pretty-error')
const pe = new PrettyError()

pe.skipNodeFiles()
pe.skipPackage('express')

module.exports.asyncHandler = (callback) => {
  return (req, res, next) => {
    Promise
      .resolve(callback(req, res, next))
      .catch(next)
  }
}

module.exports.errorMiddleware = (err, req, res, next) => {
  process.stderr.write(pe.render(err))
  res.sendStatus(500)
}
