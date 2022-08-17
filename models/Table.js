const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  table_id: String,
  store_id: String,
  is_reserved: Boolean,
  table_booking: {
    cost_booking: String,
    time_booking: String,
  },
});

const Table = mongoose.model("Table", userSchema);
module.exports = { Table };
