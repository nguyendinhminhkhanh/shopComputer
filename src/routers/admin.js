const express = require('express');


const router = express.Router();

const adminController = require('../app/controllers/adminController')
const upload = require('../app/middleware/uploadMiddleware'); // middleware multer

router.get('/', adminController.dashboard);
router.get('/product', adminController.product);
router.post('/product/add', adminController.add);
router.post('/product/search', adminController.searchProduct);

router.get('/product/edit-product/:id', adminController.edit);
router.put('/product/update/:id', adminController.update);
// router.post('/product/edit/:id', adminController.edit);

router.delete('/product/:id', adminController.delete);
router.get('/add-product', adminController.addProduct);

router.delete('/category/:id',adminController.deleteCategory);
router.post('/category/add',adminController.addCategory);
router.get('/category',adminController.category);

router.delete('/trademark/:id',adminController.deleteTrademark);
router.post('/trademark/add',adminController.addTrademark);
router.get('/trademark',adminController.trademark);




router.get('/customer', adminController.customer);
router.get('/order', adminController.order);


module.exports = router;
