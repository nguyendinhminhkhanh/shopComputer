const Trademark = require("../models/Trademarks");
const path = require('path');
const fs = require('fs');
const { mongooseToObject } = require('../../util/mongose');
const { mutipleMongooseToObject } = require('../../util/mongose');
class trademarkController {
    //Danh sách thương hiệu sản phẩm [GET] admin/trademark
    async trademark(req, res) {
        try {
            const trademarks = await Trademark.find().lean();
            res.render('admin/trademark', {
                layout: 'admin',
                currentPath: '/trademark', //req.path,
                trademarks
            });
        } catch (error) {
            next(error); // hoặc xử lý lỗi theo ý bạn
        }
    }
    //Thêm thương hiệu sản phẩm [POST] admin/trademark/add
    async add(req, res) {
        try {
            let imagePath = '';
            if (req.files && req.files.image) {
                const imageFile = req.files.image;
                const uploadDir = path.join(__dirname, '../../public/uploads/');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const fileName = Date.now() + '_' + imageFile.name;
                const uploadPath = path.join(uploadDir, fileName);
                await imageFile.mv(uploadPath);

                imagePath = '/uploads/' + fileName;
            }


            const newTrademark = new Trademark({ ...req.body, image: imagePath });
            await newTrademark.save();

            res.redirect('/admin/trademark?success=true'); // Chuyển hướng về danh sách danh mục
        } catch (error) {
            console.error(error);
            res.redirect('/admin/trademark?error=true');
        }
    }
    //Xoá thương hiệu sản phẩm [DELETE] admin/trademark/delete
    delete(req, res) {
        Trademark.findById(req.params.id)
            .then(trademark => {
                if (!trademark) {
                    return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
                }

                // Xóa file ảnh
                const imagePath = path.join(__dirname, '../../public', trademark.image); // vì image lưu '/uploads/filename'

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Xóa file ảnh khỏi server
                }

                // Xóa sản phẩm khỏi DB
                return Trademark.deleteOne({ _id: req.params.id });
            })
            .then(() => res.redirect('back'))
            .catch(error => {
                console.error(error);
                res.status(500).json({ success: false, message: 'Lỗi server' });
            });
    }

}

module.exports = new trademarkController;