const express = require('express')
const routesUsers = require('./users.routes')
const routesRoles = require('./roles.routes')
const routesCountries = require('./countries.routes')
const routesCities = require('./cities.routes')
const routesStates = require('./state.routes')
const routesProfiles = require('./profiles.routes')
const routesPublicationsTypes = require('./publications_types.routes')
const routesPublications = require('./publications.routes')
const routesVotes = require('./votes.routes')
const routesAuth = require('../routes/auth.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use(
    '/users',

    routesUsers
  )
  router.use('/roles', routesRoles)
  router.use('/countries', routesCountries)
  router.use('/cities', routesCities)
  router.use('/states', routesStates) //revisar
  router.use('/profiles', routesProfiles)
  router.use('/publications_types', routesPublicationsTypes) //revisar
  router.use('/publications', routesPublications)
  router.use('/votes', routesVotes)
  router.use('/auth', routesAuth)

  // other models here
}

module.exports = routerModels
