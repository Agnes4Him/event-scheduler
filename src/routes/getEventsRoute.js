const express = require('express')
const router = express.Router()
const getEventsController = require('../controllers/getEventsController')

router.get('/api/get-events/:email', getEventsController.getEvents)

module.exports = router