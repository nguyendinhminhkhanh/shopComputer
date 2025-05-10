const mongoose = require('mongoose');

// Tạo Schema
const CategorySchema = new mongoose.Schema({
    category: { type: String },
}, { timestamps: true, collection: 'categories' });

// Tạo Model từ Schema
const Category = mongoose.model('Category', CategorySchema,'categories');

module.exports = Category;
   