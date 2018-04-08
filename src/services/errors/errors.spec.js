/* global expect, describe, it */
const errorsService = require('./')

jest.mock('pretty-error', () => {
  return class PrettyError {
    skipNodeFiles () {}
    skipPackage () {}
    render () { jest.fn() }
  }
})

const createRes = function () {
  this.send = jest.fn((payload) => payload)
  this.status = jest.fn(() => this)
  return this
}

describe('service errors', () => {
  it('should return a collection of errors responses', () => {
    const errors = errorsService.sendError(createRes())

    expect(errors).toMatchSnapshot()
    Object.values(errors).forEach((send) => {
      expect(send()).toMatchSnapshot()
    })
  })

  it('should create a middleware with logs and a critical response', () => {
    const res = createRes()
    errorsService.errorMiddleware(new Error(), null, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })
})
