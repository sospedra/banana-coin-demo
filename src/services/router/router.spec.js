/* global expect, describe, it */
const { promisify, createRouter } = require('./')

jest.mock('express', () => ({
  Router: jest.fn(() => ({ get: jest.fn() }))
}))

describe('service router', () => {
  it('should promisify a callback with req, res, next', async () => {
    const callback = jest.fn()
    const args = [1, 2, 3]
    const promise = promisify(callback)(...args)

    await promise

    expect(promise).toBeInstanceOf(Promise)
    expect(callback).toHaveBeenCalledWith(...args)
  })

  it('should create a router given some routes', () => {
    const route = () => {}
    route.verb = 'get'
    route.path = '/'

    expect(createRouter({ route })).toMatchSnapshot()
  })
})
