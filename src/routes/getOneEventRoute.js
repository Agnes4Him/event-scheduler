const express = require('express')
const router = express.Router()
const getOneEventController = require('../controllers/getOneEventController')

router.get('/api/get-event/:userId/:eventId', getOneEventController.getOneEvent)

module.exports = router