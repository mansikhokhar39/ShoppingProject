const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,

  // ✅ IMAGE FIELD
  image: String
});

module.exports = mongoose.model("Item", itemSchema);
