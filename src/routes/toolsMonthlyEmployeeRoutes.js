const express = require('express')
const router = express.Router()
const ToolsMonthlyEmployeeController = require('../controllers/toolsMonthlyEmployeeController')

router.get('/:id', ToolsMonthlyEmployeeController.getById)

router.get('/getone/:id', ToolsMonthlyEmployeeController.getOne)

router.get('/numbertool/:id',ToolsMonthlyEmployeeController.getNumber)

router.post('/', ToolsMonthlyEmployeeController.new)

router.put('/:id', ToolsMonthlyEmployeeController.render)

module.exports = router