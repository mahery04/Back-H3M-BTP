const express = require('express')
const router = express.Router()
const CommonToolsController = require('../controllers/CommonToolsController')
const userController = require('../controllers/userController')

router.get('/', CommonToolsController.findAll);

router.post('/', CommonToolsController.create);

router.get('/:id', CommonToolsController.findById);

router.put('/:id', CommonToolsController.update);

router.delete('/:id', CommonToolsController.delete);

// router.get('/count-client',dailyEmployeeController.getcount);

module.exports = router
