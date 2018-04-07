const repository = require('../../services/repository')(__dirname, '../db.json')
const { asyncHandler } = require('../../services/router')

/**
* v1 Code for backwards compatibility
* getAll - Return all the operations
 */
module.exports.getAll = asyncHandler(async (req, res) => {
  const registry = await repository.getAll()
  return res.send(registry)
})

module.exports.getAll.verb = 'get'
module.exports.getAll.path = '/'
