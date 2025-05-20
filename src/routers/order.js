const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/orderController');

 
router.get('/', orderController.show);
router.get('/:id', orderController.orderDetails);



module.exports = router;