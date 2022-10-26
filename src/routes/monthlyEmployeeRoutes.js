const express = require('express')
const router = express.Router()
const monthlyEmployeeController = require('../controllers/monthlyEmployeeController')
const userController = require('../controllers/userController')

router.get('/', monthlyEmployeeController.findAll);

router.get('/count',monthlyEmployeeController.getcount);

router.post('/', monthlyEmployeeController.create);

router.get('/:id', monthlyEmployeeController.findById);

router.put('/:id', monthlyEmployeeController.update);

router.delete('/:id', monthlyEmployeeController.delete);


module.exports = router
