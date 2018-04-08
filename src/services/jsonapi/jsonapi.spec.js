/* global expect, describe, it */
const { getPageFromQuery, createLinks } = require('./')

describe('service jsonapi', () => {
  it('should parse the page form a req.query', () => {
    const number = 10
    const size = 60
    const query = { page: { number: number.toString(), size }}

    expect(getPageFromQuery()).toEqual({ number: 0, size: 1 })
    expect(getPageFromQuery(query)).toEqual({ number, size })
  })

  it('should return a jsonapi links object', () => {
    const number = 2
    const req = {
      protocol: 'http',
      get: () => 'localhost',
      originalUrl: `/api/route?page[number]=${number}&page[size]=10&gran=canaria`
    }

    expect(createLinks(req, number, 10)).toMatchSnapshot()
  })
})
