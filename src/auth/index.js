const express = require('express')
const { combineRoutes } = require('../services/router')

module.exports.path = '/auth'
module.exports.current = combineRoutes(express.Router(), require('./routes'))
