const express = require('express')
const router = express.Router()
const salaryServiceProviderController = require('../controllers/salaryServiceProviderController')
const userController = require('../controllers/userController')

router.get('/:id', salaryServiceProviderController.findAll);

router.post('/', salaryServiceProviderController.new);

router.get('/one/:id', salaryServiceProviderController.findById);

router.put('/:id', salaryServiceProviderController.update);

router.delete('/:id', salaryServiceProviderController.delete);


module.exports = router
