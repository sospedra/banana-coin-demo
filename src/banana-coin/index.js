const { createRouter } = require('../services/router')

module.exports.path = '/banana-coin'
module.exports.v1 = createRouter(require('./routes/version-1'))
module.exports.current = createRouter(require('./routes'))
