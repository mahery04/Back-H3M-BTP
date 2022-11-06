const express = require('express')
const router = express.Router()
const serviceProviderController = require('../controllers/serviceProviderController')

router.get('/', serviceProviderController.findAll);

router.post('/', serviceProviderController.create);

router.get('/:id', serviceProviderController.findById);

router.put('/:id', serviceProviderController.update);

router.delete('/:id', serviceProviderController.delete);


module.exports = router