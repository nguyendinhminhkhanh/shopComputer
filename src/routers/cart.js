const express = require("express");
const cartController = require("../app/controllers/cartController");
const authMiddleware = require("../app/middleware/authMiddleware");
const router = express.Router();

router.get("/basket", authMiddleware, cartController.basket);
router.post("/add", cartController.addToCart);
router.post("/order", cartController.order);
router.delete("/remove/:id", cartController.removeFromCart);

module.exports = router;
