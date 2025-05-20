const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    phone: String,
    email: String,
    address: String,
    note: String
  },
  { timestamps: true, collection: "orders" }
);

// Tạo Model từ Schema
const Orders = mongoose.model("Orders", OrdersSchema, "orders");

module.exports = Orders;
