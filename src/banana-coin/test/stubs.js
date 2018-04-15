/* global jest */
const fake = 1337
const getID = module.exports.getID = () => fake
const getBody = module.exports.getBody = () => ({
  name: 'btc',
  value: fake
})

module.exports.fake = fake
module.exports.createRes = (send = jest.fn(), sendStatus = jest.fn()) => ({ send, sendStatus })
module.exports.createReq = (body = getBody(), id = getID()) => ({ body, params: { id } })
