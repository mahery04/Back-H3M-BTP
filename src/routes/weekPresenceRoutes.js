const express = require('express')
const router = express.Router()
const weekPresenceController = require('../controllers/weekPresenceController')
const userController = require('../controllers/userController')

router.get('/month',weekPresenceController.getMonth)

router.get('/lastdate/:id',weekPresenceController.getLastDate)

router.post('/view', weekPresenceController.globalView)

router.post('/:id', weekPresenceController.create)

router.get('/:id', weekPresenceController.getById)

router.put('/salary/:id', weekPresenceController.salary)

router.put('/view/:id', weekPresenceController.update)

router.get('/salary/:id', weekPresenceController.getSalary)

router.put('/presence/:id', weekPresenceController.setPresence)

router.get('/presence/:id', weekPresenceController.nbPresence)

router.put('/absence/:id', weekPresenceController.setAbsence)

router.get('/absence/:id', weekPresenceController.nbAbsence)

router.put('/halfday/:id', weekPresenceController.setHalfday)

router.get('/halfday/:id', weekPresenceController.nbHalfday)

router.get('/history/:id', weekPresenceController.history)


module.exports = router