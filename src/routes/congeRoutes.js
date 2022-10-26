const express = require('express')
const router = express.Router()
const congeController = require('../controllers/congeController')

router.get('/fullemployee', congeController.getEmployee)

router.get('/', congeController.findAll)

router.post('/', congeController.create)

router.get('/:id', congeController.findById);

router.put('/:id', congeController.update)

router.delete('/:id', congeController.delete)

module.exports = router