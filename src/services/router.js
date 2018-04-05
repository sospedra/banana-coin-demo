module.exports.combineRoutes = (router, routes) => {
  Object.keys(routes).forEach((key) => {
    const route = routes[key]
    router[route.verb](route.path, route)
  })

  return router
}
