const mongoose = require('mongoose');

// Tạo Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true, collection: 'users' });

// Tạo Model từ Schema
const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
