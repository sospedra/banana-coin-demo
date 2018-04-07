const repository = require('../../services/repository')(__dirname, '../db.json')
const { asyncHandler } = require('../../services/router')

const STATUS_OPEN = 'open'
const STAUTS_CLOSE = 'close'

/**
 * getAll - Return all the operations
 */
module.exports.getAll = asyncHandler(async (req, res) => {
  const registry = await repository.getAll()
  return res.send(registry)
})

module.exports.getAll.verb = 'get'
module.exports.getAll.path = '/'

/**
 * getByID - Return one operation given the id
 */
module.exports.getByID = asyncHandler(async (req, res) => {
  const log = await repository.getByID(parseInt(req.params.id))
  return res.send(log)
})

module.exports.getByID.verb = 'get'
module.exports.getByID.path = '/:id'

/**
 * create - Add a new operation given a payload
 */
module.exports.create = asyncHandler(async (req, res) => {
  const newOperationID = await repository.create({
    ...req.body,
    status: STATUS_OPEN
  })

  return res.status(201).send({ id: newOperationID })
})

module.exports.create.verb = 'post'
module.exports.create.path = '/'

/**
 * updateByID - Change operation data by id
 */
module.exports.updateByID = asyncHandler(async (req, res) => {
  await repository.update(parseInt(req.params.id), req.body)
  return res.sendStatus(204)
})

module.exports.updateByID.verb = 'put'
module.exports.updateByID.path = '/:id'

/**
 * deleteByID - Remove one operation by id
 */
module.exports.deleteByID = asyncHandler(async (req, res) => {
  await repository.remove(parseInt(req.params.id))
  return res.sendStatus(204)
})

module.exports.deleteByID.verb = 'delete'
module.exports.deleteByID.path = '/:id'

/**
 * closeByID - Change operation status to closed by id
 */
module.exports.closeByID = asyncHandler(async (req, res) => {
  await repository.update(parseInt(req.params.id), { status: STAUTS_CLOSE })
  return res.sendStatus(204)
})

module.exports.closeByID.verb = 'put'
module.exports.closeByID.path = '/close/:id'
