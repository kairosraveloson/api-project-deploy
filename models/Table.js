const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  table_id: String,
  table_name: String,
  table_size: String,
  store_id: String,
  is_reserved: Boolean,
  table_booking: {
    cost_booking_ht: String,
    cost_booking_ttc: String,
    time_booking: String,
    tax_info: {
      tax_id: String,
      tax_rate: String,
    },
  },
  is_free: Boolean,
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Table = mongoose.model("Table", userSchema);
module.exports = { Table };
