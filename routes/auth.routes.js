const express = require('express')
const router = express.Router()

const authControllers = require('../controllers/auth.controller')

// router.get('/', getCities)
router.post('/login', authControllers.postLogin)

// router.get('/:id', getCity)
// router.put('/:id', updateCity)
// router.delete('/:id', removeCity)

module.exports = router
