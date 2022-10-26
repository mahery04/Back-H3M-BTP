const express = require('express')
const router = express.Router()
const monthlyPresenceController = require('../controllers/monthlyPresenceController')

router.put('/:id', monthlyPresenceController.action)

module.exports = router