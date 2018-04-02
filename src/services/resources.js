const DEFAULT_STATE = []

const findByID = module.exports.get = function (state, id) {
  return state.find((op) => op.id === id)
}

const create = module.exports.create = function (operation) {
  const id = state.length

  state = [...state, {
    ...operation,
    id
  }]

  return id
}

const update = module.exports.update = function (id, patch) {
  const operation = { ...this.get(id), patch }
  const index = this.getIndex(id)
  const operations = [...state]

  operations[index] = operation
  state = operations
}

const getIndex = module.exports.getIndex = function (id) {
  return state.findIndex((op) => op.id === id)
}

const remove = module.exports.remove = function (id) {
  const index = this.getIndex(id)

  state = [
    ...state.slice(0, index),
    ...state.slice(index + 1)
  ]
}

const purge = module.exports.purge = function () {
  state = DEFAULT_STATE
}
