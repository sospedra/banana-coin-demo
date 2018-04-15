const { noop } = require('lodash')
const express = require('express')

const { sendError } = require('../errors')

/**
 * Generate a router freely customizable by a callback and include a bottom
 * middleware to redirect to the current latest version active
 * @param  {[type]} [callback=noop] [description]
 * @return {[type]}                 [description]
 */
module.exports.createVersion = (callback = noop) => {
  const version = express.Router()

  callback(version)

  version.use((req, res) => {
    res.redirect(301, req.url)
  })

  return version
}

/**
 * Create a 404-type middleware specific for unsupported versions
 * @return {Func} middleware
 */
module.exports.unsupportedVersion = () => {
  return (req, res) => sendError(res).version()
}
