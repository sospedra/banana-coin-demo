const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const getRegistryFactory = (DBPath) => {
  return async () => {
    const file = await readFile(DBPath)
    return JSON.parse(file)
  }
}

const saveRegistryFactory = (DBPath) => {
  return (lastID, logs) => {
    const registry = { lastID, logs, lastModified: new Date().getTime() }
    return writeFile(DBPath, JSON.stringify(registry))
  }
}

/**
 * Generate a fn that returns all the logs
 *
 * @param {Func} getRegistry
 * @return {Func}
 *  @return {Any[]} logs
 */
const getAll = (getRegistry) => async () => {
  const { logs } = await getRegistry()
  return logs
}

/**
 * Generate a fn that returns one log given an id
 *
 * @param {Func} getRegistry
 * @return {Func}
 *  @param {Number} id
 *  @return {Object} log
 */
const getByID = (getRegistry) => async (id) => {
  const { logs } = await getRegistry()
  return logs.find((log) => log.id === id)
}

/**
 * Generate a fn that saves a new log and returns the id
 *
 * @param {Func} getRegistry
 * @param {Func} saveRegistry
 * @return {Func}
 *  @param {Object} log - To be saved
 *  @return {Number} id
 */
const create = (getRegistry, saveRegistry) => async (log) => {
  const { lastID, logs } = await getRegistry()
  const id = lastID + 1

  await saveRegistry(id, [...logs, { ...log, id }])

  return id
}

/**
 * Generate a fn that patches an existing log given the id and the patch
 *
 * @param {Func} getRegistry
 * @param {Func} saveRegistry
 * @return {Func}
 *  @param {Number} id
 *  @param {Object} patch
 */
const update = (getRegistry, saveRegistry) => async (id, patch) => {
  const { lastID, logs } = await getRegistry()
  const index = logs.findIndex((log) => log.id === id)
  const log = logs[index]

  await saveRegistry(lastID, [
    ...logs.slice(0, index),
    { ...log, ...patch },
    ...logs.slice(index + 1)
  ])
}

/**
 * Generate a fn that removes an existing log given the id
 *
 * @param {Func} getRegistry
 * @param {Func} saveRegistry
 * @return {Func}
 *  @param {Number} id
 */
const remove = (getRegistry, saveRegistry) => async (id) => {
  const { lastID, logs } = await getRegistry()
  const index = logs.findIndex((log) => log.id === id)

  await saveRegistry(lastID, [
    ...logs.slice(0, index),
    ...logs.slice(index + 1)
  ])
}

/**
 * Generate a fn that restores the db to it's initial state
 *
 * @param {Func} saveRegistry
 * @return {Func}
 */
const purge = (saveRegistry) => async () => {
  await saveRegistry(-1, [])
}

/**
 * Return a collection of respository function given the db pathfile
 *
 * @param  {String} dirname - Absolute path
 * @param  {String} dbname - Name including extension
 * @return {Object} collection
 */
module.exports = (dirname, dbname) => {
  const DBPath = path.resolve(dirname, dbname)
  const getRegistry = getRegistryFactory(DBPath)
  const saveRegistry = saveRegistryFactory(DBPath)

  return {
    getAll: getAll(getRegistry),
    getByID: getByID(getRegistry),
    create: create(getRegistry, saveRegistry),
    update: update(getRegistry, saveRegistry),
    remove: remove(getRegistry, saveRegistry),
    purge: purge(saveRegistry)
  }
}
