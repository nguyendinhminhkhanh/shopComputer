const CartItem = require("../models/CartItems");
const Order = require("../models/Orders");
const bcrypt = require("bcrypt");

class cartController {
  //[POST] cart/basket
  basket(req, res, next) {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    const cart = req.session.cart;
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    res.render("shoppingCart", {
      cart,
      totalQuantity,
      totalPrice,
      BASE_URL: process.env.BASE_URL,
    });
  }

  //[POST] cart/add
  async addToCart(req, res, next) {
    try {
      if (!req.session.existingUser) {
        return res.redirect("/auth/login");
      }

      const { _id, quantity, name, price, image } = req.body;

      if (!_id || !quantity || !name || !price || !image) {
        return res.status(400).send(req.body);
      }

      const parsedQuantity = Number(quantity);
      const parsedPrice = Number(price);

      // ---------- Ghi vào session ----------
      if (!req.session.cart) {
        req.session.cart = [];
      }

      const existingIndex = req.session.cart.findIndex(
        (item) => item._id === _id
      );

      if (existingIndex !== -1) {
        req.session.cart[existingIndex].quantity += parsedQuantity;
      } else {
        req.session.cart.push({
          _id,
          name,
          price: parsedPrice,
          quantity: parsedQuantity,
          image,
        });
      }

      // ---------- Tính tổng ----------
      const cart = req.session.cart;
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // ---------- Render ----------
      res.render("shoppingCart", {
        cart,
        totalQuantity,
        totalPrice,
        message: "Đã thêm vào giỏ hàng thành công",
      });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      next(error);
    }
  }
  async restoreCartFromDB(userId) {
    try {
      const cartItems = await CartItem.find({ userId });
      return cartItems.map((item) => ({
        _id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));
    } catch (err) {
      console.error("Lỗi khôi phục giỏ hàng:", err);
      return []; // Trả về mảng rỗng khi có lỗi
    }
  }

  removeFromCart(req, res, next) {
    const _id = req.params.id;
    if (!req.session.cart) {
      return res.render("/cart");
    }
    // Tìm index của sản phẩm cần xóa
    const index = req.session.cart.findIndex((item) => item._id === _id);
    if (index !== -1) {
      req.session.cart.splice(index, 1);
    }
    res.redirect("/cart/basket");
  }

  async order(req, res, next) {
    const user = req.session.existingUser;
    const { name, phone, email, address, note } = req.body;
    const obj = {
      userId: user._id,
      name,
      phone,
      email,
      address,
      note,
    };
    // Assuming you have an Order model imported 
    const order = new Order(obj);
    await order.save();
    res.render("home", { message: "Đặt hàng thành công!" });
  }
}

module.exports = new cartController();
