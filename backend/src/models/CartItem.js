const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  encryptedData: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
