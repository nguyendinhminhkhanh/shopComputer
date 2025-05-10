const express = require('express');
const router = express.Router();
// const { protect } = require('../app/middleware/authMiddleware');
const productControllers = require('../app/controllers/productController');

router.get('/',productControllers.show);
// router.get('/show',productControllers.show);


module.exports = router;