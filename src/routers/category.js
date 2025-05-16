const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/categoryController');

router.delete('/:id', categoryController.delete);
router.post('/add', categoryController.add);
router.get('/', categoryController.category);

module.exports = router;