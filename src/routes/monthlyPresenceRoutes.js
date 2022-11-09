const express = require('express')
const router = express.Router()
const monthlyPresenceController = require('../controllers/monthlyPresenceController')

router.get('/fullemployee', monthlyPresenceController.getEmployee)

router.get('/', monthlyPresenceController.findAll)

router.post('/', monthlyPresenceController.create)

router.get('/:id', monthlyPresenceController.findById);

router.put('/:id', monthlyPresenceController.update)

router.delete('/:id', monthlyPresenceController.delete)

module.exports = router