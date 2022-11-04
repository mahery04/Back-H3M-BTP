const express = require('express')
const router = express.Router()
const contratMonthlyEmployeeController = require('../controllers/contratMonthlyEmployeeController')

router.get('/:id', contratMonthlyEmployeeController.findAll);

router.post('/',contratMonthlyEmployeeController.new);

router.get('/one/:id', contratMonthlyEmployeeController.findById);

router.put('/:id', contratMonthlyEmployeeController.update);

router.delete('/:id', contratMonthlyEmployeeController.delete);


module.exports = router