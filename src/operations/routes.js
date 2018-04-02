const repository = require('./repository')

const STATUS_OPEN = 'open'
const STAUTS_CLOSE = 'close'

/**
 * getAll - Return all the operations
 */
const getAll = module.exports.getAll = (req, res) => {
  try {
    return res.send(repository.getAll())
  } catch (ex) {
    console.log('getall error')
  }
}

getAll.verb = 'get'
getAll.path = '/'

/**
 * getByID - Return one operation given the id
 */
const getByID = module.exports.getByID = (req, res) => {
  try {
    return res.send(repository.get(req.params.id))
  } catch (ex) {
    console.log('getByID error')
  }
}

getByID.verb = 'get'
getByID.path = '/:id'

/**
 * create - Add a new operation given a payload
 */
const create = module.exports.create = (req, res) => {
  try {
    const newOperationID = repository.create({
      ...req.body,
      status: STATUS_OPEN
    })

    return res.send({ id: newOperationID })
  } catch (ex) {
    console.log('create error')
  }
}

create.verb = 'post'
create.path = '/'

/**
 * updateByID - Change operation data by id
 */
const updateByID = module.exports.updateByID = (req, res) => {
  try {
    return res.send(repository.update(req.params.id, req.body))
  } catch (ex) {
    console.log('update error')
  }
}

updateByID.verb = 'put'
updateByID.path = '/:id'

/**
 * deleteByID - Remove one operation by id
 */
const deleteByID = module.exports.deleteByID = (req, res) => {
  try {
    return res.send(repository.remove(req.params.id))
  } catch (ex) {
    console.log('delete error')
  }
}

deleteByID.verb = 'delete'
deleteByID.path = '/:id'

/**
 * closeByID - Change operation status to closed by id
 */
const closeByID = module.exports.closeByID = (req, res) => {
  try {
    return res.send(repository.update(req.params.id, { status: STAUTS_CLOSE }))
  } catch (ex) {
    console.log('closed error')
  }
}

closeByID.verb = 'put'
closeByID.path = '/close/:id'
