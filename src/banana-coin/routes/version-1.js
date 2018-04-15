const repository = require('../../services/repository')(__dirname, '../db.json')
const { promisify } = require('../../services/router')
const { createJAR } = require('../../services/jsonapi')

/**
 * v1 Code for backwards compatibility
 * getAll - Return all the operations without pagination
 */
module.exports.getAll = promisify(async (req, res) => {
  const logs = await repository.getAll()
  return res.send(createJAR('coins', logs))
})

module.exports.getAll.verb = 'get'
module.exports.getAll.path = '/'
