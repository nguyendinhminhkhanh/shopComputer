
const bcrypt = require('bcrypt');

class cartController {
    //[POST] cart/basket
    basket(req, res, next) {
        res.render('shoppingCart', { BASE_URL: process.env.BASE_URL });
    }

    //[POST] cart/add
    addToCart(req, res, next) {
        if (!req.session.existingUser) {
            return res.redirect('/auth/login'); // chuyển hướng chứ không render ở POST
        }

        const { productId, quantity, name, price, image } = req.body;

        if (!req.session.cart) req.session.cart = [];

        const existingProductIndex = req.session.cart.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            req.session.cart[existingProductIndex].quantity += Number(quantity);
        } else {
            req.session.cart.push({
                productId,
                name,
                price: Number(price),
                quantity: Number(quantity),
                image
            });
        }

        // Tính tổng số sản phẩm và tổng giá
        const cart = req.session.cart;
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        res.render('shoppingCart', {
            cart,
            totalQuantity,
            totalPrice,
            message: 'Đã thêm vào giỏ hàng thành công'
        });
    }
}

module.exports = new cartController;