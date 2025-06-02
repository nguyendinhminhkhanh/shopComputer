const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const trademarkRouter = require("./trademark");
const homeRouter = require("./home");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const checkRole = require("../app/middleware/checkRole");

function router(app) {
  app.use("/", homeRouter);
  app.use("/admin", checkRole, adminRouter);
  app.use("/admin/product", checkRole, productRouter);
  app.use("/admin/category", checkRole, categoryRouter);
  app.use("/admin/trademark", checkRole, trademarkRouter);
  app.use("/admin/order", checkRole, orderRouter);
  app.use("/cart", cartRouter);
  app.use("/auth", authRouter);
  app.use("/product", productRouter);
}

module.exports = router;
