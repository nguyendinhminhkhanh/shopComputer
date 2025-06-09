const Product = require("../models/Products");
const Trademark = require("../models/Trademarks");
const { mongooseToObject } = require("../../util/mongose");
const { mutipleMongooseToObject } = require("../../util/mongose");
class homeController {
  async show(req, res) {
    try {
      const trademarks = await Trademark.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .lean();
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .lean(); // Dùng lean() để lấy object thuần
      const mainboard = await Product.find({
        category: { $regex: "Mainboard" },
      });
      const CPU = await Product.find({
        category: { $regex: "CPU" },
      });
      const RAM = await Product.find({
        category: { $regex: "RAM" },
      });
      const GPU = await Product.find({
        category: { $regex: "GPU" },
      });
      const PSU = await Product.find({
        category: { $regex: "PSU" },
      });
      const SSD = await Product.find({
        category: { $regex: "SSD" },
      });
      res.render("home", {
        products,
        trademarks,
        mainboard: mutipleMongooseToObject(mainboard),
        CPU: mutipleMongooseToObject(CPU),
        RAM: mutipleMongooseToObject(RAM),
        GPU: mutipleMongooseToObject(GPU),
        PSU: mutipleMongooseToObject(PSU),
        SSD: mutipleMongooseToObject(SSD),
        BASE_URL: process.env.BASE_URL,
      });
    } catch {
      res.status(500).send("Loi server");
    }
  }
}

module.exports = new homeController();
