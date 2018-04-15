/* global expect, describe, it, jest */
const { createJAR } = require('../../services/jsonapi')
const routes = require('../routes')
const stubs = require('./stubs')

jest.mock('../../services/repository', () => () => {
  const { fake } = require('./stubs')
  return {
    create: jest.fn(() => fake),
    getAll: jest.fn(() => fake),
    getByID: jest.fn(() => fake),
    purge: jest.fn(() => fake),
    remove: jest.fn(() => fake),
    update: jest.fn(() => fake)
  }
})

describe('operations routes', () => {
  it('should return all the operations from getByID', async () => {
    const req = stubs.createReq()
    const res = stubs.createRes()

    await routes.getByID(req, res)

    expect(res.send).toHaveBeenCalledWith(createJAR('coin', stubs.fake, stubs.fake))
    expect(Object.entries(routes.getByID)).toMatchSnapshot()
  })
})
