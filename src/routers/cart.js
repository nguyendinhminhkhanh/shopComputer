const express = require('express');
const cartController = require('../app/controllers/cartController')
const router = express.Router();

router.get('/basket', cartController.basket);
router.post('/add', cartController.addToCart);

module.exports = router;