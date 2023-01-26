const express = require('express')
const router = express.Router()

const {
  getCities,
  addCity,
  getCity,
  updateCity,
  removeCity,
} = require('../controllers/cities.controller')

/**
 * @swagger
 * components: 
 *  schemas:
 *    Cities:
 *      type: object
 *      properties: 
 *        state_id: integer
 *        name: 
 *          type: varchar
 *          description: get the cities
 *      required: false
 */

/**
 * @swagger
 * /cities
 *  get:
 *    summary: get all the cities
 *    tags: [States] 
 *    responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cities'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cities'
        '400':
          description: Invalid city
 *        
 */
router.get('/cities', getCities)

router.post('/', addCity)
router.get('/:id', getCity)
router.put('/:id', updateCity)
router.delete('/:id', removeCity)

module.exports = router
