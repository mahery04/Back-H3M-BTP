const express = require('express')
const router = express.Router()
const permissionController = require('../controllers/permissionController')

router.get('/fullemployee', permissionController.getEmployee)

router.get('/', permissionController.findAll)

router.post('/', permissionController.create)

router.get('/:id', permissionController.findById)

router.put('/:id', permissionController.update)

router.put('/validation/:id', permissionController.validation)

router.delete('/:id', permissionController.delete)

module.exports = router