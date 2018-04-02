const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const DB_PATH = path.resolve(__dirname, 'db.json')

const getRegistry = async () => {
  const file = await readFile(DB_PATH)
  const p = JSON.parse(file)
  console.log(p)
  return p
}

const saveRegistry = (lastID, logs) => {
  const registry = { lastID, logs, lastModified: new Date().getTime() }
  return writeFile(DB_PATH, JSON.stringify(registry))
}

module.exports.getAll = async () => {
  const { logs } = await getRegistry()
  return logs
}

module.exports.getByID = async (id) => {
  const { logs } = await getRegistry()
  return logs.find((log) => log.id === id)
}

module.exports.create = async (log) => {
  const { lastID, logs } = await getRegistry()
  const id = lastID + 1

  await saveRegistry(id, [...logs, { ...log, id }])

  return id
}

module.exports.update = async (id, patch) => {
  const { lastID, logs } = await getRegistry()
  const index = logs.findIndex((log) => log.id === id)
  const log = logs[index]

  await saveRegistry(lastID, [
    ...logs.slice(0, index),
    { ...log, ...patch },
    ...logs.slice(index + 1)
  ])
}

module.exports.remove = async (id) => {
  const { lastID, logs } = await getRegistry()
  const index = logs.findIndex((log) => log.id === id)

  await saveRegistry(lastID, [
    ...logs.slice(0, index),
    ...logs.slice(index + 1)
  ])
}

module.exports.purge = async () => {
  await saveRegistry(-1, [])
}
