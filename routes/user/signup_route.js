const express = require('express')
const { body } = require('express-validator'),
router = express.Router()


const controller = require('../../controllers/user/signup_controller')

router.get('/', controller.get) // When a user signup, page loads
router.post('/',[
    body('name').isLength({max: 50}).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 8, max: 180}).escape(),
    body('confirmPassword').isLength({min: 8, max: 180}).escape()
], controller.post) // When a request is sent from signup page

module.exports = router