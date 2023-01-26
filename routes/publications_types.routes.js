const express = require('express')
const router = express.Router()


const {
  getPublicationsTypes,
  addPublicationType,
  getPublicationType,
  updatePublicationType,
  removePublicationType,
} = require('../controllers/publications_types.controller')

/**
 * @swagger
 * components: 
 *  schemas:
 *    PublicationsTypes:
 *      type: object
 *      properties: 
 *        name: 
 *          type: varchar
 *          description: the publications types
 *        description:  
 *          type: varchar
 *          description: the description of the publications types
 *      required: false
 *      example: 
 *        name: Movies
 *        descrption: This publication is about movies
 */

/**
 * @swagger
 * /publications-types
 *  get:
 *    summary: get all publications types
 *    tags: [PublicationsTypes] 
 *    responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PublicationsTypes'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PublicationsTypes'
        '400':
          description: Invalid publication type
 *        
 */
router.get('/publications-types', getPublicationsTypes)

router.post('/', addPublicationType)

/**
 * @swagger
 * components: 
 *  schemas:
 *    PublicationsTypesByID:
 *      type: object
 *      properties: 
 *        name: 
 *          type: varchar
 *          description: the publications types by id
 *        description:  
 *          type: varchar
 *          description: the description of the publications types by id
 *      required: false
 *     
 */

/**
 * @swagger
 * /:publication_type_id
 *  get:
 *    summary: get publications by id
 *    tags: [PublicationsTypesByID] 
 *    responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PublicationsTypesByID'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PublicationsTypesByID'
        '400':
          description: Invalid publication type
 *        
 */
router.get('/:publication_type_id', getPublicationType)

router.put('/:id', updatePublicationType)
router.delete('/:id', removePublicationType)

module.exports = router
