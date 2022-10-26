const express = require('express')
const router = express.Router()
const dailyEmployeeController = require('../controllers/dailyEmployeeController')
const userController = require('../controllers/userController')

router.get('/', dailyEmployeeController.findAll);

router.get('/count',dailyEmployeeController.getcount);

router.post('/', dailyEmployeeController.create);

router.get('/:id', dailyEmployeeController.findById);

router.put('/:id', dailyEmployeeController.update);

router.delete('/:id', dailyEmployeeController.delete);

module.exports = router