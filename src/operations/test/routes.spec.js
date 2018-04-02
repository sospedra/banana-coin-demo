/* global expect, describe, it */
const routes = require('../routes')
const stubs = require('./stubs')

describe('operations routes', () => {
  it('should return all the operations from getAll', () => {
    const res = stubs.createRes()

    routes.getAll({}, res)

    expect(res.send).toHaveBeenCalledWith([])
    expect(Object.entries(routes.getAll)).toMatchSnapshot()
  })

  it('should create one operation from create', () => {
    const res = stubs.createRes()

    routes.create(stubs.createReq(), res)
    expect(res.send).toHaveBeenCalledWith({ id: 0 })

    routes.create(stubs.createReq(), res)
    expect(res.send).toHaveBeenCalledWith({ id: 1 })

    expect(Object.entries(routes.create)).toMatchSnapshot()
  })
})
