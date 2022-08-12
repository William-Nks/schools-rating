const express = require('express'),
router = express.Router(),
controller = require('../../controllers/logout/logout_controller')

// calls controller to clean up the session.
router.get('/', controller.get)

module.exports = router