const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  item_id: String,
  item_price_cost: String,
  store_id: String,
  item_stock: String,
  item_stock_value: String,
});

const Warehouse = mongoose.model("Warehouse", userSchema);
module.exports = { Warehouse };
