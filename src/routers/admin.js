const express = require('express');


const router = express.Router();

const adminController = require('../app/controllers/adminController')
const productController = require('../app/controllers/productController')

router.get('/dashboard',adminController.dashboard);

// router.get('/product', productController.product);
// router.post('/product/add', productController.add);
// router.post('/product/search', productController.searchProduct);
// router.get('/product/edit-product/:id', productController.edit);
// router.put('/product/update/:id', productController.update);
// // router.post('/product/edit/:id', adminController.edit);
// router.delete('/product/:id', productController.delete);
// router.get('/add-product', productController.addProduct);

// router.delete('/category/:id',adminController.deleteCategory);
// router.post('/category/add',adminController.addCategory);
// router.get('/category',adminController.category);

// router.delete('/trademark/:id',adminController.deleteTrademark);
// router.post('/trademark/add',adminController.addTrademark);
// router.get('/trademark',adminController.trademark);




router.get('/customer', adminController.customer);
// router.get('/order', adminController.order);


module.exports = router;
