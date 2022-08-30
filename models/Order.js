const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  Order_id: String,
  Store_ID: String,
  User_ID: String,
  User_name: String,
  User_phone: String,
  Date_creation: String,
  commentaire_order: String,
  Date_creation: String,
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
});

const Order = mongoose.model("Order", storeSchema);
module.exports = { Order };
