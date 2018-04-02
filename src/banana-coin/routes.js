const repository = require('./repository')

const STATUS_OPEN = 'open'
const STAUTS_CLOSE = 'close'

/**
 * getAll - Return all the operations
 */
const getAll = module.exports.getAll = async (req, res) => {
  try {
    const registry = await repository.getAll()
    return res.send(registry)
  } catch (ex) {
    console.log('getall error', ex)
  }
}

getAll.verb = 'get'
getAll.path = '/'

/**
 * getByID - Return one operation given the id
 */
const getByID = module.exports.getByID = async (req, res) => {
  try {
    const log = await repository.getByID(parseInt(req.params.id))
    return res.send(log)
  } catch (ex) {
    console.log('getByID error', ex)
  }
}

getByID.verb = 'get'
getByID.path = '/:id'

/**
 * create - Add a new operation given a payload
 */
const create = module.exports.create = async (req, res) => {
  try {
    const newOperationID = await repository.create({
      ...req.body,
      status: STATUS_OPEN
    })

    return res.send({ id: newOperationID })
  } catch (ex) {
    console.log('create error', ex)
  }
}

create.verb = 'post'
create.path = '/'

/**
 * updateByID - Change operation data by id
 */
const updateByID = module.exports.updateByID = async (req, res) => {
  try {
    await repository.update(parseInt(req.params.id), req.body)
    return res.send(200)
  } catch (ex) {
    console.log('update error', ex)
  }
}

updateByID.verb = 'put'
updateByID.path = '/:id'

/**
 * deleteByID - Remove one operation by id
 */
const deleteByID = module.exports.deleteByID = async (req, res) => {
  try {
    await repository.remove(parseInt(req.params.id))
    return res.send(200)
  } catch (ex) {
    console.log('delete error', ex)
  }
}

deleteByID.verb = 'delete'
deleteByID.path = '/:id'

/**
 * closeByID - Change operation status to closed by id
 */
const closeByID = module.exports.closeByID = async (req, res) => {
  try {
    await repository.update(parseInt(req.params.id), { status: STAUTS_CLOSE })
    return res.send(200)
  } catch (ex) {
    console.log('closed error', ex)
  }
}

closeByID.verb = 'put'
closeByID.path = '/close/:id'
