const express = require('express')
const operationsRouter = express.Router()

const routes = require('./routes')

Object.keys(routes).forEach((key) => {
  const route = routes[key]
  operationsRouter[route.verb](route.path, route)
})

module.exports = operationsRouter
