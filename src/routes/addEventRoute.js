const express = require('express')
const router = express.Router()
const addEventController = require('../controllers/addEventController')

router.post('/api/addadd-event', addEventController.addEvent)

module.exports = router

