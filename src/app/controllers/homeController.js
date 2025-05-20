const Product = require("../models/Products");
const { mongooseToObject } = require("../../util/mongose");
const { mutipleMongooseToObject } = require("../../util/mongose");
class homeController {
    async show(req, res) {
        try {
            const products = await Product.find()
                .sort({ createdAt: -1 })
                .limit(4)
                .lean(); // Dùng lean() để lấy object thuần
            res.render("home", { products, BASE_URL: process.env.BASE_URL });
        } catch {
            res.status(500).send("Loi server");
        }
    }
}

module.exports = new homeController();
