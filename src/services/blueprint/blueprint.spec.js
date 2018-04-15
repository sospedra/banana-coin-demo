/* global expect, describe, it */
const { toPlainObject, noop } = require('lodash')
const { composeBlueprint } = require('./')

const routeWithBlueprint = (blueprint) => {
  const route = () => {}
  route.blueprint = blueprint
  return route
}

describe('service blueprint', () => {
  it('should compose a blueprint string from routes object', () => {
    const routes = toPlainObject([
      routeWithBlueprint('# Cowboy'),
      routeWithBlueprint('# Bebop'),
      noop
    ])

    expect(composeBlueprint(routes)).toMatchSnapshot()
  })
})
