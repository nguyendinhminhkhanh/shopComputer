const mongoose = require('mongoose');

// Tạo Schema
const TrademarkSchema = new mongoose.Schema({
    trademark: { type: String },
    image: { type: String },
}, { timestamps: true, collection: 'trademarks' });

// Tạo Model từ Schema
const Trademark = mongoose.model('Trademark', TrademarkSchema,'trademarks');

module.exports = Trademark;
   