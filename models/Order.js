const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  Order_id: String,
  Store_ID: String,
  User_ID: String,
  User_name: String,
  User_phone: String,
  commentaire_order: String,
  Current_state: String,
  is_delivery: Boolean,
  delivery_information: {
    city_delivery: String,
    adress_delivery: String,
    Delivery_cost: String,
    Delivery_duration: String,
    delivery_dispatched_time: String,
  },
  is_pickup: Boolean,
  pickup_info: {
    preparation_finished_time: String,
    whished_pickup_time: String,
  },
  is_book_table: Boolean,
  table_info: {
    table_id: String,
    table_size: String,
    Table_reservation_cost: String,
  },
  items_information: [
    {
      item_id: String,
      item_description: String,
      item_type: String,
      item_url: String,
      item_quantity: String,
      item_price_ht: String,
      item_price_ttc: String,
      item_total_ht: String,
      item_total_ttc: String,
      item_discount_percentate: String,
      item_discount_amount: String,
      item_vat_id: String,
      item_vat_rate: String,
      item_vat_amount: String,
    },
  ],
  Reject_reason: String,
  Total_ttc_amount: String,
  Total_ht_amount: String,
  Date_creation: String,
  Cooking_time: String,
});

const Order = mongoose.model("Order", storeSchema);
module.exports = { Order };
