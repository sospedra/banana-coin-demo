const express = require('express')
const bananaCoinRouter = express.Router()

const routes = require('./routes')

Object.keys(routes).forEach((key) => {
  const route = routes[key]
  bananaCoinRouter[route.verb](route.path, route)
})

module.exports = bananaCoinRouter
