const express = require('express');
const trademarkController = require('../app/controllers/trademarkController');

const router = express.Router();

router.delete('/:id',trademarkController.delete);
router.post('/add',trademarkController.add);
router.get('/',trademarkController.trademark);

module.exports = router;