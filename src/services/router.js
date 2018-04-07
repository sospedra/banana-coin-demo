module.exports.asyncHandler = (callback) => {
  return (req, res, next) => Promise
    .resolve(callback(req, res, next))
    .catch(next)
}

module.exports.combineRoutes = (router, routes) => {
  Object.keys(routes).forEach((key) => {
    const route = routes[key]
    router[route.verb](route.path, route)
  })

  return router
}