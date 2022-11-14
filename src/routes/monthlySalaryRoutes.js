const express = require('express')
const router = express.Router()
const monthlySalaryController = require('../controllers/monthlySalaryController')

router.get('/', monthlySalaryController.findAll);

router.post('/', monthlySalaryController.create);

router.get('/:id', monthlySalaryController.findById);

router.put('/:id', monthlySalaryController.update);

router.delete('/:id', monthlySalaryController.delete);

module.exports = router