module.exports = {
    mutipleMongooseToObject: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}

//multipleMongooseToObject() là hàm tiện ích (utility)
//dùng để chuyển mảng dữ liệu từ Mongoose về dạng JavaScript "thuần" (plain object)
//điều này bắt buộc nếu bạn dùng Handlebars (hbs) để render dữ liệu trong view.