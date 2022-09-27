const express = require('express')
const router = express.Router()
const confirmEmailController = require('../controllers/confirmEmailController')

router.post('/api/confirm-email', confirmEmailController.confirmEmail)

module.exports = router