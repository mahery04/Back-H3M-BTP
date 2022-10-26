const express = require('express')
const router = express.Router()
const ToolsDailyEmployeeController = require('../controllers/toolsDailyEmployeeController')

router.get('/:id', ToolsDailyEmployeeController.getById)

router.get('/getone/:id', ToolsDailyEmployeeController.getOne)

router.get('/numbertool/:id',ToolsDailyEmployeeController.getNumber)

router.post('/', ToolsDailyEmployeeController.new)

router.put('/:id', ToolsDailyEmployeeController.render)

module.exports = router