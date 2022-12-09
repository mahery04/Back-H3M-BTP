const express = require('express')
const router = express.Router()
const TrashController = require('../controllers/trashController')
const userController = require('../controllers/userController')

router.get('/', TrashController.findAll);

router.post('/', TrashController.create);

router.delete('/:id', TrashController.delete);


module.exports = router
