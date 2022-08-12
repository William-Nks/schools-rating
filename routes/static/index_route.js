const express = require('express')
const router = express.Router()


const controller = require('../../controllers/static/index_controller')

// Renders /index and passes session for some operations on the client side.
router.get('/', controller.get)

module.exports = router