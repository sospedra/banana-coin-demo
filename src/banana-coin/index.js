const express = require('express')
const { combineRoutes } = require('../services/router')
const routes = require('./routes')

const bananaCoinRouter = express.Router()

module.exports = combineRoutes(bananaCoinRouter, routes)
