const express = require('express')
const router = express.Router()
const monthlyPresenceController = require('../controllers/monthlyPresenceController')

router.post('/:id', monthlyPresenceController.action)

module.exports = router