const mongoose = require("mongoose");

//createing schema
const menuListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 10,
  },
  taste: {
    type: String,
    enum: ["sour", "sweet", "spicy"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const MenuList = mongoose.model("menuList", menuListSchema);
module.exports = MenuList;
