const User = require("../models/User");
const Order = require("../models/Orders");
const CartItem = require("../models/CartItems");
const { mongooseToObject } = require('../../util/mongose');
const { mutipleMongooseToObject } = require('../../util/mongose');
class orderController {
  async show(req, res) {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }).lean(); // Dùng lean() để lấy object thuần
      res.render("admin/order", {
        layout: "admin",
        orders,
        currentPath: req.path,
      });
    } catch {
      res.status(500).send("Loi server");
    }
  }

  async orderDetails(req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await Order.find({userId:orderId}).lean();
      const cartItems = await CartItem.find({userId:orderId}).lean();
      const users = await User.find().sort({ createdAt: -1 }).lean();

    console.log(cartItems)
      res.render("admin/order", {
        layout: "admin",
        cartItems,
        users,
        order,
        currentPath: req.path,
      });
    } catch {
      res.status(500).send("Loi server");
    }
  }
}

module.exports = new orderController();
 