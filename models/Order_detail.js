const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  Order_id: String,
  Store_ID: String,
  User_ID: String,
  User_phone: String,
  Date_creation: String,
  items_information: [
    {
      item_id: String,
      item_type: String,
      image_url: String,
      item_quantity: String,
      item_price_ht: String,
      item_price_ttc: String,
      item_total_ht: String,
      item_total_ttc: String,
      item_discount: String,
      item_vat_id: String,
      item_vat_rate: String,
    },
  ],
});

const Order_detail = mongoose.model("Order_detail", orderSchema);
module.exports = { Order_detail };
