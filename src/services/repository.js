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

const getAll = (getRegistry) => async () => {
  const { logs } = await getRegistry()
  return logs
}

const getByID = (getRegistry) => async (id) => {
  const { logs } = await getRegistry()
  return logs.find((log) => log.id === id)
}

const create = (getRegistry, saveRegistry) => async (log) => {
  const { lastID, logs } = await getRegistry()
  const id = lastID + 1

  await saveRegistry(id, [...logs, { ...log, id }])

  return id
}

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

const remove = (getRegistry, saveRegistry) => async (id) => {
  const { lastID, logs } = await getRegistry()
  const index = logs.findIndex((log) => log.id === id)

  await saveRegistry(lastID, [
    ...logs.slice(0, index),
    ...logs.slice(index + 1)
  ])
}

const purge = (saveRegistry) => async () => {
  await saveRegistry(-1, [])
}

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
