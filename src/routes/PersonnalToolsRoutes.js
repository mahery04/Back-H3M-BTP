const express = require('express')
const router = express.Router()
const PersonnalToolsController = require('../controllers/PersonnalToolsController')
const userController = require('../controllers/userController')

router.get('/', PersonnalToolsController.findAll);

router.post('/', PersonnalToolsController.create);

router.get('/:id', PersonnalToolsController.findById);

router.put('/:id', PersonnalToolsController.update);

router.delete('/:id', PersonnalToolsController.delete);

// router.get('/count-client',dailyEmployeeController.getcount);

module.exports = router
