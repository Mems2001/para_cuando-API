const express = require('express')
const router = express.Router()

const {
  getStates,
  addState,
  getState,
  updateState,
  removeState,
} = require('../controllers/state.controller')

/**
 * @swagger
 * components: 
 *  schemas:
 *    States:
 *      type: object
 *      properties: 
 *        name: 
 *          type: varchar
 *          description: get the states
 *      required: false
 */

/**
 * @swagger
 * /states
 *  get:
 *    summary: get all the states
 *    tags: [States] 
 *    responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/States'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/States'
        '400':
          description: Invalid state
 *        
 */
router.get('/states', getStates)

router.post('/', addState)
router.get('/:id', getState)
router.put('/:id', updateState)
router.delete('/:id', removeState)

module.exports = router
