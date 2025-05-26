const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/productController');

 
router.get('/', productController.product);
router.post('/add', productController.addHandle);
router.post('/search', productController.searchProduct);
router.get('/edit-product/:id', productController.edit);
router.put('/update/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/add', productController.add);



module.exports = router;