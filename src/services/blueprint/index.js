const { memoize } = require('lodash')
const { promisify } = require('util')
const aglio = require('aglio')

const { sendError } = require('../errors')

/**
 * Return all the available blueprints from a routes object
 * @param  {Object} routes
 * @return {String} blueprint
 */
module.exports.composeBlueprint = (routes) => {
  return Object.values(routes)
    .map(({ blueprint }) => blueprint)
    .filter((blueprint) => blueprint)
    .join('\n')
}

/**
 * Generate docs endpoint which intakes all the blueprints and render them
 * Because docs are generated on the fly its being memoized
 *
 * @param {String[]} [blueprints=[]]
 * @return {Func} - Express-like route controller
 */
module.exports.generateDocs = (blueprints = []) => {
  const blueprint = blueprints.join('\n')
  const render = memoize(promisify(aglio.render))

  return (req, res) => {
    return render(blueprint, {})
      .then(res.send)
      .catch(() => sendError(res).docs())
  }
}
