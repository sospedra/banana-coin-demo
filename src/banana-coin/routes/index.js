const { chunk, get } = require('lodash')

const repository = require('../../services/repository')(__dirname, '../db.json')
const { promisify } = require('../../services/router')
const { getPageFromQuery, createLinks, createJAR } = require('../../services/jsonapi')
const { PATH } = require('../constants')

const STATUS_OPEN = 'open'
const STAUTS_CLOSE = 'close'

/**
 * getAll - Return all the operations
 */
module.exports.getAll = promisify(async (req, res) => {
  const { number, size } = getPageFromQuery(req.query)
  const registry = await repository.getAll()
  const pages = chunk(registry, size)
  const lastPage = pages.length - 1

  return res.send({
    ...createJAR('coins', get(pages, number), number),
    meta: { lastPage },
    links: createLinks(req, number, lastPage)
  })
})

module.exports.getAll.verb = 'get'
module.exports.getAll.path = '/'
module.exports.getAll.blueprint = `
## GET ${PATH}/{?number&size}
+ Request (application/json)
  + Parameters
    + number (number) - Current page
      + Default: 0
    + size (number) - Number of coins per page
      + Default: 1
+ Response 200 (application/json)
  + Body
    {
      data: {
        type: 'coins',
        attributes: [{
          id: 0,
          name: 'coin',
          status: 'open',
          value: 1337
        }]
      },
      meta: { lastPage: 'Link' },
      links: { self: 'Link', prev: 'Link', next: 'Link', first: 'link', last: 'link' }
    }
`

/**
 * getByID - Return one operation given the id
 */
module.exports.getByID = promisify(async (req, res) => {
  const { id } = req.params
  const log = await repository.getByID(id)

  return res.send(createJAR('coin', log, id))
})

module.exports.getByID.verb = 'get'
module.exports.getByID.path = '/:id'
module.exports.getByID.blueprint = `
## GET ${PATH}/:id
+ Response 200 (application/json)
  {
    data: {
      type: 'coin',
      id: 13,
      attributes: {
        id: 13,
        name: 'coin',
        status: 'open',
        value: 1337
      }
    }
  }
`

/**
 * create - Add a new operation given a payload
 */
module.exports.create = promisify(async (req, res) => {
  const newOperationID = await repository.create({
    ...req.body,
    status: STATUS_OPEN
  })

  return res.status(201).send(createJAR('coin', undefined, newOperationID))
})

module.exports.create.verb = 'post'
module.exports.create.path = '/'
module.exports.create.blueprint = `
## POST ${PATH}/
+ Request (application/json)
  + Body
    {
      name: 'coin',
      value: 1337
    }
+ Response 201 (application/json)
  {
    data: {
      type: 'coin',
      id: 1337
    }
  }
`

/**
 * updateByID - Change operation data by id
 */
module.exports.updateByID = promisify(async (req, res) => {
  await repository.update(parseInt(req.params.id), req.body)
  return res.sendStatus(204)
})

module.exports.updateByID.verb = 'patch'
module.exports.updateByID.path = '/:id'
module.exports.updateByID.blueprint = `
## PATCH ${PATH}/:id
+ Response 204 (application/json)
`

/**
 * deleteByID - Remove one operation by id
 */
module.exports.deleteByID = promisify(async (req, res) => {
  await repository.remove(parseInt(req.params.id))
  return res.sendStatus(204)
})

module.exports.deleteByID.verb = 'delete'
module.exports.deleteByID.path = '/:id'
module.exports.deleteByID.blueprint = `
## DELETE ${PATH}/:id
+ Response 204 (application/json)
`

/**
 * closeByID - Change operation status to closed by id
 */
module.exports.closeByID = promisify(async (req, res) => {
  await repository.update(parseInt(req.params.id), { status: STAUTS_CLOSE })
  return res.sendStatus(204)
})

module.exports.closeByID.verb = 'put'
module.exports.closeByID.path = '/close/:id'
module.exports.closeByID.blueprint = `
## PATCH ${PATH}/close/:id
+ Response 204 (application/json)
`
