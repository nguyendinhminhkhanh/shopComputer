const Category = require("../models/Categories");
class categoryController{
   //Danh sách danh mục sản phẩm [GET] admin/category
    async category(req, res, next) {
        try {
            const categories = await Category.find().lean();
            res.render('admin/category', {
                layout: 'admin',
                currentPath: '/category', //req.path,
                categories
            });
        } catch (error) {
            next(error); // hoặc xử lý lỗi theo ý bạn
        }
    }
    //Thêm danh mục sản phẩm [POST] admin/category/add
    async add(req, res) {
        try {
            const { category } = req.body;

            if (!category || category.trim() === '') {
                return res.status(400).send('Tên danh mục không được để trống');
            }

            const newCategory = new Category({ category: category });
            await newCategory.save();

            res.redirect('/admin/category?success=true'); // Chuyển hướng về danh sách danh mục
        } catch (error) {
            console.error(error);
            res.redirect('/admin/category?error=true');

        }
    }
    //Xóa danh mục sản phẩm [DELETE] admin/category/delete
    delete(req, res) {
        Category.findById(req.params.id)
            .then(category => {
                if (!category) {
                    return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
                }
                // Xóa sản phẩm khỏi DB
                return Category.deleteOne({ _id: req.params.id });
            })
            .then(() => res.redirect('back'))
            .catch(error => {
                console.error(error);
                res.status(500).json({ success: false, message: 'Lỗi server' });
            });
    }
}
module.exports = new categoryController;