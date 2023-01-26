const express = require('express')
const router = express.Router()

const passportJWT = require('../middlewares/auth.middleware')
const { roleMiddleware } = require('../middlewares/role.middleware')

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')

const { getVotes } = require('../controllers/votes.controller')

const { getPublications } = require('../controllers/publications.controller')

router
  .route('/')
  .get(
    passportJWT.authenticate('jwt', { session: false }),
    roleMiddleware,
    getUsers
  )
  .post(addUser)
router.post('/', addUser)
router.get('/:user_id', getUser)

/**
 * @swagger
 * components: 
 *  schemas:
 *    Users:
 *      type: object
 *      properties: 
 *        first_name: 
 *          type: varchar
 *          description: the user's first name
 *        last_name:  
 *          type: varchar
 *          description: the user's last name
 *        email:
 *          type: varchar
 *          description: the user's email
 *      required: false
 *      example: 
 *        first_name: Angel
 *        last_name: Carrasco
 *        email: acarrascocesa@mail.com
 */

/**
 * @swagger
 * /users
 *  get:
 *    summary: get all the users
 *    tags: [Users] 
 *    responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Users'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Users'
        '400':
          description: Invalid user
 *        
 */
router.get('/users', getUser)


router.get('/:user_id/votes', getVotes)
router.get('/:user_id/publications', getPublications)

/**
 * @swagger
 * components: 
 *  schemas:
 *    UpdateUsers:
 *      type: object
 *      properties: 
 *        first_name: 
 *          type: varchar
 *          description: the user's first name
 *        last_name:  
 *          type: varchar
 *          description: the user's last name
 *        email:
 *          type: varchar
 *          description: the user's email
 *        username: 
 *          type: varchar
 *          description: the user's username
 *      required: false
 *      example: 
 *        first_name: Angel
 *        last_name: Carrasco
 *        email: acarrascocesa@mail.com
 *        username: academlo
 */

/**
 * @swagger
 * /:user_id
 *  put:
 *    summary: update an user
 *    tags: [UpdateUsers] 
 *    responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UpdateUsers'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UpdateUsers'
        '400':
          description: Invalid user
 *        
 */
router.put('/:user_id', updateUser)


router.delete('/:id', removeUser)

module.exports = router
