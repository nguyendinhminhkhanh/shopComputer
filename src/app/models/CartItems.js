const mongoose = require("mongoose");

const CartItemsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { timestamps: true, collection: "cartitems" }
);

// Tạo Model từ Schema
const CartItems = mongoose.model("CartItems", CartItemsSchema, "cartitems");

module.exports = CartItems;
