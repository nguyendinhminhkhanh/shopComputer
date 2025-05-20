const mongoose = require('mongoose');

// Tạo Schema
// title: { type: String },
const ProductsSchema = new mongoose.Schema({
    // detail: { type: String },
    // thumbnail: { type: String }
    name: { type: String, required: true },
    nameUnsigned: { type: String },
    sku: { type: String, required: true },
    category: { type: String, required: true },
    trademark: { type: String, required: true },
    content: { type: String },
    price: { type: Number },
    discount: { type: Number },
    image: { type: String },
                                                                                                  
}, { timestamps: true, collection: 'products' });

// Tạo Model từ Schema
const Product = mongoose.model('Product', ProductsSchema, 'products');

module.exports = Product;
