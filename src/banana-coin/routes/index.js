const { chunk, get } = require('lodash')

const repository = require('../../services/repository')(__dirname, '../db.json')
const { promisify } = require('../../services/router')
const { getPageFromQuery, createLinks } = require('../../services/jsonapi')

const STATUS_OPEN = 'open'
const STAUTS_CLOSE = 'close'

/**
 * getAll - Return all the operations
 */
module.exports.getAll = promisify(async (req, res) => {
  const { number, size } = getPageFromQuery(req.query)
  const registry = await repository.getAll()
  const pages = chunk(registry, size)
  const attributes = get(pages, number)
  const lastPage = pages.length - 1

  return res.send({
    data: {
      type: 'coins',
      id: number,
      attributes
    },
    meta: { lastPage },
    links: createLinks(req, number, lastPage)
  })
})

module.exports.getAll.verb = 'get'
module.exports.getAll.path = '/'

/**
 * getByID - Return one operation given the id
 */
module.exports.getByID = promisify(async (req, res) => {
  const log = await repository.getByID(parseInt(req.params.id))
  return res.send({ data: log })
})

module.exports.getByID.verb = 'get'
module.exports.getByID.path = '/:id'

/**
 * create - Add a new operation given a payload
 */
module.exports.create = promisify(async (req, res) => {
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
module.exports.updateByID = promisify(async (req, res) => {
  await repository.update(parseInt(req.params.id), req.body)
  return res.sendStatus(204)
})

module.exports.updateByID.verb = 'put'
module.exports.updateByID.path = '/:id'

/**
 * deleteByID - Remove one operation by id
 */
module.exports.deleteByID = promisify(async (req, res) => {
  await repository.remove(parseInt(req.params.id))
  return res.sendStatus(204)
})

module.exports.deleteByID.verb = 'delete'
module.exports.deleteByID.path = '/:id'

/**
 * closeByID - Change operation status to closed by id
 */
module.exports.closeByID = promisify(async (req, res) => {
  await repository.update(parseInt(req.params.id), { status: STAUTS_CLOSE })
  return res.sendStatus(204)
})

module.exports.closeByID.verb = 'put'
module.exports.closeByID.path = '/close/:id'
