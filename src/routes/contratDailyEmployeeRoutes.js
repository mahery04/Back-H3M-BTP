const express = require('express')
const router = express.Router()
const contratDailyEmployeeController = require('../controllers/contratDailyEmployeeController')

router.get('/:id', contratDailyEmployeeController.findAll);

router.post('/',contratDailyEmployeeController.new);

router.get('/one/:id', contratDailyEmployeeController.findById);

router.put('/:id', contratDailyEmployeeController.update);

router.delete('/:id', contratDailyEmployeeController.delete);


module.exports = router