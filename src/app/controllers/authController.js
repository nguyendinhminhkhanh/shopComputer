const User = require("../models/User");
const CartItem = require("../models/CartItems");
const cartController = require("./cartController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
class authController {
  //[GET] /auth/login
  login(req, res, next) {
    res.render("login");
  }

  //[GET] /auth/register
  register(req, res, next) {
    console.log(req.error);
    res.render("register");
  }

  //[POST] /auth/login
  async loginHandle(req, res, next) {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).render("login", {
          error: "Thông tin đăng nhập không chính xác",
          oldInput: req.body,
        });
      }
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        console.log("Đăng nhập thành công");
        // return res.status(200).json({result: existingUser.role})
        const token = jwt.sign(
          { userId: existingUser._id, email: existingUser.email }, // Payload
          process.env.JWT_SECRET, // Secret key
          { expiresIn: "1h" } // Thời gian hết hạn
        );

        req.session.existingUser = existingUser;
        
        //Thêm giỏ hàng từ DB vào session (an toàn khi rỗng)
        const restoredCart = await cartController.restoreCartFromDB(
          existingUser._id
        );
        req.session.cart = Array.isArray(restoredCart) ? restoredCart : [];

        console.log(req.session);

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600000, // 1 giờ
          sameSite: "Strict",
        });

        res.redirect("/");
        // res.status(200).json({
        //     message: "Đăng nhập thành công",
        //     data: {
        //         token
        //     }
        // })
        
      } else {
        return res.status(400).render("login", {
          error: "Thông tin đăng nhập không chính xác",
          oldInput: req.body,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  //[POST] /auth/logout
  async logoutHandle(req, res, next) {
    try {
      const user = req.session.existingUser;

      if (user && req.session.cart && req.session.cart.length > 0) {
        await CartItem.deleteMany({ userId: user._id }); // Xóa giỏ cũ nếu muốn

        const itemsToSave = req.session.cart.map((item) => ({
          userId: user._id,
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));

        await CartItem.insertMany(itemsToSave);
      }

      res.clearCookie("connect.sid"); // Tên cookie mặc định cho express-session
      req.session.destroy((err) => {
        if (err) return next(err);
        res.redirect("/auth/login");
      });
    } catch (error) {
      next(error);
    }
  }

  //[POST] /auth/register
  async registerHandle(req, res, next) {
    try {
      let successMessage = "Đăng kí thành công";
      const { email, phone, password } = req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
      });

      if (existingUser) {
        let errorMessage = "Tài khoản đã tồn tại với ";
        if (existingUser.email === email) errorMessage += "email này. ";
        if (existingUser.phone === phone) errorMessage += "số điện thoại này.";

        return res.status(400).render("register", {
          error: errorMessage,
          oldInput: req.body,
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        ...req.body,
        password: hashedPassword,
      });
      await user.save();

      res.render("login", { success: successMessage });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new authController();
