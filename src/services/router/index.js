const express = require('express')

module.exports.promisify = (callback) => {
  return (req, res, next) => Promise
    .resolve(callback(req, res, next))
    .catch(next)
}

module.exports.createRouter = (routes) => {
  const router = express.Router()

  Object.values(routes).forEach((route) => {
    router[route.verb](route.path, route)
  })

  return router
}
