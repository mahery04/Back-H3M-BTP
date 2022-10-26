const express = require('express')
const router = express.Router()
const dailyPresenceController = require('../controllers/dailyPresenceController')
const userController = require('../controllers/userController')

router.put('/:id', dailyPresenceController.action)

// router.get('/salary/:id', dailyPresenceController.salary)

module.exports = router