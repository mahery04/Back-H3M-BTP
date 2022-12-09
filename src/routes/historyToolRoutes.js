const express = require('express')
const router = express.Router()
const historyToolController = require('../controllers/historyToolController')

router.get('/:id', historyToolController.findAll);

router.post('/',historyToolController.new);

router.get('/one/:id', historyToolController.findById);

router.put('/:id', historyToolController.update);

router.delete('/:id', historyToolController.delete);


module.exports = router