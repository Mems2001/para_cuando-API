const express = require('express')
const router = express.Router()

const passportJWT = require('../middlewares/auth.middleware')
const { roleMiddleware } = require('../middlewares/role.middleware')

const {
  getUsers,
  addUser,
  getUser,
  putUser,
  removeUser,
} = require('../controllers/users.controller')

const { getVotes } = require('../controllers/votes.controller')
const { getPublications } = require('../controllers/publications.controller')
const { getOwnProfile } = require('../controllers/profiles.controller')

router
  .route('/')
  .get(
    passportJWT.authenticate('jwt', { session: false }),
    roleMiddleware,
    getUsers
  )
  .post(addUser)

router.get('/user-info' , passportJWT.authenticate('jwt' , {session:false}) , getOwnProfile)

router.route('/:user_id')
  .get(getUser)
  .put(passportJWT.authenticate('jwt' , {session: false}) , putUser)
  .delete(passportJWT.authenticate('jwt' , {session: false}) , removeUser)

// router.get('/users', getUser)

router.get('/:user_id/votes', getVotes)
router.get('/:user_id/publications', getPublications)

module.exports = router
