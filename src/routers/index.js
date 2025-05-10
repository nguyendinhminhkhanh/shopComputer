const userRouter = require('./user');
const productRouter = require('./product');
const adminRouter = require('./admin');
const authRouter = require('./auth');
// const Product = require('../app/models/products');
function router(app) {
  // app.use('/',productRouter);
  app.use('/', productRouter);
  app.use('/auth', authRouter);
  app.use('/admin', adminRouter);
  // app.use('/product', productRouter);
  // app.use('/',newRouter)

  // app.get('/', async (req, res) => {
  //   try {
  //     const products = await Product.find();
  //     console.log(products); // Kiểm tra dữ liệu có lấy được không
  //     res.render('home', { products }); // Truyền dữ liệu sang template
  //   } catch (error) {
  //     console.error('Lỗi lấy dữ liệu từ MongoDB:', error);
  //     res.status(500).send('Lỗi server');
  //   }
  // });

}

module.exports = router;