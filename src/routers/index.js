const userRouter = require('./user');
const productRouter = require('./product');
const categoryRouter = require('./category');
const trademarkRouter = require('./trademark');
const homeRouter = require('./home');
const adminRouter = require('./admin');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');


function router(app) {
  app.use('/', homeRouter);
  app.use('/admin', adminRouter);
  app.use('/admin/product', productRouter);
  app.use('/admin/category', categoryRouter);
  app.use('/admin/trademark', trademarkRouter);
  app.use('/admin/order', orderRouter);
  app.use('/cart', cartRouter);
  app.use('/auth', authRouter);
}

module.exports = router;