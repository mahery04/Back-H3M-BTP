const express = require('express')
const router = express.Router()
const toolingController = require('../controllers/toolingController')
const userController = require('../controllers/userController')

router.get('/', userController.access, toolingController.findAll);

router.get('/tooling/:id', userController.access, toolingController.findById);

module.exports = router