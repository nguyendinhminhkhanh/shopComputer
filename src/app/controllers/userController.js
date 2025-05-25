const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

class userController {
  async formlogin(req, res) {
    res.render("login");
  }
  async formregister(req, res) {
    res.render("register");
  }
  async register(req, res) {
    try {

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // return res.status(400).json({ message: "Email đã được sử dụng!" });
        return res.send(
          `<script>alert('Email đã được sử dụng!'); window.location.href='/formregister';</script>`
        );
      }

      // Hash mật khẩu 
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      // res.status(201).json({ message: "Đăng ký thành công!", userId: user._id });
      return res.send(
        `<script>alert('Đăng ký thành công!'); window.location.href='/formregister';</script>`
      );
    } catch (error) {
      // res.status(500).json({ message: 'Lỗi khi thêm dữ liệu', error: error.message });
      return res.send(
        `<script>alert('Không thể đăng kí tài khoản!'); window.location.href='/formregister';</script>`
      );
    }
  }

  async login(req, res) {
    try {
      
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        // return res.status(400).send('Email không tồn tại!');
        res.render("login", { message: "Thông tin đăng nhập không chính xác" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // return res.status(400).send('Mật khẩu không đúng!');
        res.render("login", { message: "Thông tin đăng nhập không chính xác" });
      }

      const token = generateToken(user._id);

      
      // res.json({ id: user._id, email: user.email });
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.locals.user = user;
      res.render("home");
      // res.json({
      //     _id: user._id,
      //     username: user.username,
      //     token: generateToken(user._id),
      // });
    } catch (error) {
      res.status(500).send("Lỗi khi xử lý đăng nhập");
    }
  }

  async profile(req, res) {
    try {
      
      if (!req.user) {
        return res.redirect("/login");
      }

      res.render("profile", { user: req.user });
    } catch (error) {
      res.status(500).send("Lỗi khi tải trang hồ sơ");
    }
  }
}

module.exports = new userController();
