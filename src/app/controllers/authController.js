const User = require("../models/User");
const bcrypt = require('bcrypt');
class authController {
    //[GET] /auth/login
    login(req, res, next) {
        res.render('login');
    }

    //[GET] /auth/register
    register(req, res, next) {
        console.log(req.error)
        res.render('register');

    }

    //[POST] /auth/login
    async loginHandle(req, res, next) {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                console.log("Tài khoản không tồn tại ");
                return res.status(400).render("auth/login", {
                    error: "Email không tồn tại",
                    oldInput: req.body
                });
            }
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (isMatch) {
                console.log("Đăng nhập thành công");
                // Có thể lưu thông tin vào session tại đây
                req.session.existingUser = existingUser;
                return res.redirect("/");
            } else {
                console.log("Sai mật khẩu");
                return res.status(400).render("auth/login", {
                    error: "Sai mật khẩu",
                    oldInput: req.body
                });
            }
        } catch (error) {
            next(error);
        }
    }

    //[POST] /auth/logout
    logoutHandle(req, res, next) {
        req.session.destroy(err => {
            if (err) {
                console.log('Lỗi khi xóa session:', err);
                return res.redirect('/'); // Trở lại trang chính nếu có lỗi
            }
            // Xóa cookie session
            res.clearCookie('connect.sid'); // Tên cookie mặc định cho express-session
            res.redirect('/auth/login'); // Chuyển hướng về trang đăng nhập
        });

    }

    //[POST] /auth/register
    async registerHandle(req, res, next) {
        try {
            let successMessage = 'Đăng kí thành công';
            const { email, phone, password } = req.body;

            const existingUser = await User.findOne({
                $or: [{ email }, { phone }]
            });

            if (existingUser) {
                let errorMessage = 'Tài khoản đã tồn tại với ';
                if (existingUser.email === email) errorMessage += 'email này. ';
                if (existingUser.phone === phone) errorMessage += 'số điện thoại này.';

                return res.status(400).render("register", {
                    error: errorMessage,
                    oldInput: req.body
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                ...req.body,
                password: hashedPassword
            });
            await user.save();

            res.render("login", { success: successMessage });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new authController;