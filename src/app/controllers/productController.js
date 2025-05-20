const Product = require("../models/Products");
const Category = require("../models/Categories");
const Trademark = require("../models/Trademarks");
const path = require('path');
const fs = require('fs');
const { mongooseToObject } = require('../../util/mongose');
const { mutipleMongooseToObject } = require('../../util/mongose');
const removeVietnameseTones = require('../../util/removeVietnameseTones')
class productController {

  // async show (req, res) {
  //       try {
  //         const products = await Product.find() .sort({ createdAt: -1 }).limit(4).lean(); // Dùng lean() để lấy object thuần
  //         res.render('home', { products });
  //       }
  //       catch {
  //         res.status(500).send('Loi server');
  //       }
  //     }
  

  async product(req, res) {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.render('admin/product', { layout: 'admin',
       products, 
       query: req.query,
        currentPath: '/product'//req.path 
      });
  }

  //Thêm sản phẩm
  async add(req, res) {
    const categories = await Category.find().lean();
    const trademarks = await Trademark.find().lean();
    res.render('admin/add-product', { layout: 'admin', categories, trademarks, currentPath: req.path });
  } 
  async addHandle(req, res) {
    try {
      let imagePath = '';

      // Nếu có file upload
      if (req.files && req.files.image) {
        const imageFile = req.files.image;

        // Tạo thư mục lưu trữ nếu chưa có
        const uploadDir = path.join(__dirname, '../../public/uploads/');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Tạo tên file mới tránh trùng
        const fileName = Date.now() + '_' + imageFile.name;
        const uploadPath = path.join(uploadDir, fileName);

        // Move file vào thư mục uploads
        await imageFile.mv(uploadPath);

        // Lưu đường dẫn tương đối để lưu DB
        imagePath = '/uploads/' + fileName;
      }

      // Sau đó bạn tạo product
      const product = new Product({
        ...req.body,
        nameUnsigned: removeVietnameseTones(req.body.name),
        image: imagePath,
      });

      await product.save();
      res.redirect('/admin/product?success=true');
    } catch (error) {
      console.error(error);
      res.status(500).send('Upload thất bại');
    }
  }

  //Tìm kiếm sản phẩm  
  async searchProduct(req, res, next) {
    const keyword = removeVietnameseTones(req.body.keyword);
    // console.log("Tìm kiếm:", keyword);
    try {
      const products = await Product.find({
        nameUnsigned: { $regex: keyword, $options: 'i' } // Tìm gần đúng
      });
      // console.log("Kết quả:", products);
      res.render('admin/product', {
        layout: 'admin',
        valueSearch: req.body.keyword,
        products: mutipleMongooseToObject(products),
        query: req.query,
        currentPath: req.path
      });
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error.message);
      res.status(500).json({ success: false, message: 'Không thể tìm kiếm!' });
    }
  }




  //Xoá sản phẩm
  delete(req, res) {
    //req.params.id cách để lấy thông tin trên url
    Product.findById(req.params.id)
      .then(product => {
        if (!product) {
          return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
        }

        // Xóa file ảnh
        const imagePath = path.join(__dirname, '../../public', product.image); // vì image lưu '/uploads/filename'

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Xóa file ảnh khỏi server
        }

        // Xóa sản phẩm khỏi DB
        return Product.deleteOne({ _id: req.params.id });
      })
      .then(() => res.redirect('back'))
      .catch(error => {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
      });
  }


  //Sửa sản phẩm
  edit(req, res, next) {
    Product.findById(req.params.id)
      .then(product => {
        res.render('admin/edit-product',
          { layout: 'admin', product: mongooseToObject(product), query: req.query, currentPath: req.path }
        );
      })
      .catch(next);
  }


  update(req, res, next) {
    const id = req.params.id;
    const data = req.body; // dữ liệu text

    Product.findById(id)
      .then(product => {
        if (!product) {
          return res.status(404).send('Product not found');
        }

        if (req.files && req.files.image) {
          const imageFile = req.files.image; // lấy file mới

          // Đường dẫn file ảnh cũ
          const oldImagePath = path.join(__dirname, '../../public', product.image);

          // Xoá ảnh cũ nếu tồn tại
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error('Không xoá được ảnh cũ hoặc ảnh không tồn tại:', err.message);
            } else {
              console.log('Đã xoá ảnh cũ:', oldImagePath);
            }
          });

          // Lưu ảnh mới
          const uploadPath = path.join(__dirname, '../../public/uploads/', imageFile.name);
          imageFile.mv(uploadPath, (err) => {
            if (err) {
              console.error('Lỗi khi upload ảnh mới:', err);
              return next(err);
            }

            // Update đường dẫn ảnh mới vào database
            data.image = '/uploads/' + imageFile.name;

            // Cập nhật dữ liệu
            Product.updateOne({ _id: id }, data)
              .then(() => res.redirect('/admin/product'))
              .catch(next);
          });
        } else {
          // Không upload ảnh mới → chỉ update text
          Product.updateOne({ _id: id }, data)
            .then(() => res.redirect('/admin/product'))
            .catch(next);
        }
      })
      .catch(next);
  }



}

module.exports = new productController;
