const express = require('express')
const router = express.Router()

const {
  getPublications,
  addPublication,
  getPublication,
  updatePublication,
  removePublication,
} = require('../controllers/publications.controller')

/**
 * @swagger
 * components: 
 *  schemas:
 *    Publications:
 *      type: object
 *      properties: 
 *        
 *        publication_type_id: integer
 *        
 *        title varchar
 *        description varchar
 *        picture varchar
 *      required: false
 *      example: 
 *        name: Movies
 *        descrption: This publication is about movies
 */

/**
 * @swagger
 * /publications
 *  get:
 *    summary: get all publications 
 *    tags: [Publications] 
 *    responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Publications'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Publications'
        '400':
          description: Invalid publication 
 *        
 */
router.get('/publications', getPublications)

router.post('/publications', addPublication)
router.get('/:publication_id', getPublication)
router.get('/:publication_id/vote', getPublication)
// router.put('/:id', updatePublication)
router.delete('/:publication_id', removePublication)

module.exports = router
