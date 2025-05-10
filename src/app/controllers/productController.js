const Product = require("../models/Products");

class productControllers{
    async show (req, res) {
        try {
          const products = await Product.find() .sort({ createdAt: -1 }).limit(4).lean(); // Dùng lean() để lấy object thuần
          res.render('home', { products });
        }
        catch {
          res.status(500).send('Loi server');
        }
      }
  
     

}

module.exports = new productControllers;
