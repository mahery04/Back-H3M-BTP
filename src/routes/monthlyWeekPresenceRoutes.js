const express = require('express')
const router = express.Router()
const monthlyWeekPresence = require('../controllers/monthlyWeekPresenceController')

router.get('/month',monthlyWeekPresence.getMonth)

router.post('/view', monthlyWeekPresence.globalView)

router.post('/:id', monthlyWeekPresence.create)

router.get('/:id', monthlyWeekPresence.getById)

router.put('/presence/:id', monthlyWeekPresence.setPresence)

router.put('/view/:id', monthlyWeekPresence.update)

router.get('/presence/:id', monthlyWeekPresence.nbPresence)

router.put('/absence/:id', monthlyWeekPresence.setAbsence)

router.get('/absence/:id', monthlyWeekPresence.nbAbsence)

router.put('/salary/:id', monthlyWeekPresence.salary)

router.get('/salary/:id', monthlyWeekPresence.getSalary)

router.put('/advance/:id', monthlyWeekPresence.advance)

router.get('/advance/:id', monthlyWeekPresence.getAdvance)

router.get('/history/:id', monthlyWeekPresence.history)

module.exports = router