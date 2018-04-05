const express = require('express')
const { combineRoutes } = require('../services/router')
const routes = require('./routes')

const authRouter = express.Router()

module.exports = combineRoutes(authRouter, routes)
