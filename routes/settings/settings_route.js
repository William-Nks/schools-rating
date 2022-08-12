const express = require('express')
const { body } = require('express-validator'),
router = express.Router(),
controller = require('../../controllers/settings/settings_controller')


router.get('/', controller.get)
router.post('/',[
    body('password').isLength({min: 8, max: 180}).escape(),
    body('confirmPassword').isLength({min: 8, max: 180}).escape()
], controller.post)

module.exports = router