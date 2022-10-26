const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

router.get('/', PostController.findAll);

router.post('/', PostController.create);

router.delete('/:id', PostController.delete);

module.exports = router