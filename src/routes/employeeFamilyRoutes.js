const express = require('express')
const router = express.Router()
const employeeFamilyController = require('../controllers/employeeFamilyController')

router.get('/fullemployee', employeeFamilyController.getEmployee);

router.get('/', employeeFamilyController.findAll);

router.post('/', employeeFamilyController.create);

router.get('/:id', employeeFamilyController.findById);

router.put('/:id', employeeFamilyController.update);

router.delete('/:id', employeeFamilyController.delete);

module.exports = router