const express = require('express')
const router = express.Router()
const deleteEventController = require('../controllers/deleteEventController')

router.delete('/api/delete-event/:id/:email', deleteEventController.deleteEvent)

module.exports = router