const { createRouter } = require('../services/router')

module.exports.path = '/auth'
module.exports.current = createRouter(require('./routes'))
