const { createRouter } = require('../services/router')
const { composeBlueprint } = require('../services/blueprint')
const v1 = require('./routes/version-1')
const routes = require('./routes')
const { PATH } = require('./constants')

module.exports.path = PATH
module.exports.current = createRouter(routes)
module.exports.blueprint = composeBlueprint(routes)
module.exports.v1 = createRouter(v1)
