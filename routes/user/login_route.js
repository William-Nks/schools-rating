const express = require('express')
const { body } = require('express-validator'),
router = express.Router(),
controller = require('../../controllers/user/login_controller')


router.get('/', controller.get) // When login page loads
router.post('/',[
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 8, max: 180})
], controller.post) // When a request is made from login page

module.exports = router