const operationsRepository = function () {}

operationsRepository.operations = []

operationsRepository.getAll = function () {
  return this.operations
}

operationsRepository.get = function (id) {
  return this.operations.find((op) => op.id === id)
}

operationsRepository.create = function (operation) {
  const id = this.operations.length

  this.operations = [...this.operations, {
    ...operation,
    id
  }]

  return id
}

operationsRepository.update = function (id, patch) {
  const operation = { ...this.get(id), patch }
  const index = this.getIndex(id)
  const operations = [...this.operations]

  operations[index] = operation
  this.operations = operations
}

operationsRepository.getIndex = function (id) {
  return this.operations.findIndex((op) => op.id === id)
}

operationsRepository.remove = function (id) {
  const index = this.getIndex(id)

  this.operations = [
    ...this.operations.slice(0, index),
    ...this.operations.slice(index + 1)
  ]
}

module.exports = operationsRepository
