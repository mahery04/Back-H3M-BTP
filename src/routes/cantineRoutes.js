const express = require('express')
const router = express.Router()
const contineController = require('../controllers/cantineController')

router.get('/', contineController.getAll)

router.post('/', contineController.create)

router.delete('/:id', contineController.delete)


module.exports = router