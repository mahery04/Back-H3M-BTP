const express = require('express')
const router = express.Router()
const serviceProviderController = require('../controllers/serviceProviderController')

router.post('/', serviceProviderController.create)

module.exports = router