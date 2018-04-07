const express = require('express')
const { combineRoutes } = require('../services/router')

module.exports.path = '/banana-coin'
module.exports.v1 = combineRoutes(express.Router(), require('./routes/version-1'))
module.exports.current = combineRoutes(express.Router(), require('./routes'))
