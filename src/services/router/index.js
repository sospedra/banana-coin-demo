const express = require('express')

/**
 * Given a promisified/async-await/normal function resolves as:
 *   1. The success as usual
 *   2. The error is sent through the next fn
 * This system opens the possibility to have an error middleware later on
 *
 * @param  {Function} callback
 * @return {Func} - Express-like
 *  @return {Promise}
 */
module.exports.promisify = (callback) => {
  return (req, res, next) => Promise
    .resolve(callback(req, res, next))
    .catch(next)
}

/**
 * Given a routes object create a Router composing all the verbs and paths
 * @param  {Object} routes
 * @return {Object} Router - composed with given routes
 */
module.exports.createRouter = (routes) => {
  const router = express.Router()

  Object.values(routes).forEach((route) => {
    router[route.verb](route.path, route)
  })

  return router
}
