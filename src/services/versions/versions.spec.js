/* global expect, describe, it */
const { createVersion } = require('./')

jest.mock('express', () => ({
  Router: jest.fn(() => ({ use: jest.fn() }))
}))

describe('service versions', () => {
  it('should create a version with a possible callback', async () => {
    const callback = jest.fn()

    expect(createVersion(callback)).toMatchSnapshot()
    expect(callback).toHaveBeenCalled()
  })
})
