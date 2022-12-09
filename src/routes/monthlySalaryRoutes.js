const express = require('express')
const router = express.Router()
const monthlySalaryController = require('../controllers/monthlySalaryController')

router.get('/month',monthlySalaryController.getMonth);

router.post('/view', monthlySalaryController.globalView);

router.get('/getall/:id', monthlySalaryController.findAll);

router.get('/employees', monthlySalaryController.getEmployees);

router.post('/', monthlySalaryController.create);

router.get('/:id', monthlySalaryController.findById);

router.put('/:id', monthlySalaryController.update);

router.delete('/:id', monthlySalaryController.delete);

module.exports = router