const express = require('express')
const { body } = require('express-validator')
const router = express.Router()


const controller = require('../../controllers/view/view_controller')

// Renders /index and passes session for some operations on the client side.
router.get('/:school', controller.get)
router.post('/:school',[
    body('comment').trim().escape().isLength({min: 1, max: 250}),
    body('rate').isLength({min: 1, max: 5})
], controller.post)
router.delete('/:school', controller.delete)

module.exports = router