/* global jest */
const getBody = module.exports.getBody = () => ({
  name: 'btc',
  value: 1337
})

const getID = module.exports.getID = () => 1337

module.exports.createRes = (send = jest.fn()) => ({
  json: jest.fn(),
  send
})

module.exports.createReq = (body = getBody(), id = getID()) => ({
  body,
  params: { id }
})
