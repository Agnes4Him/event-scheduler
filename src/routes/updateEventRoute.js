const express = require('express')
const router = express.Router()
const updateEventController = require('../controllers/updateEventController')

router.put('/api/update-event/:userId/:eventId', updateEventController.updateEvent)

module.exports = router