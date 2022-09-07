const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  taxid: {
    type: String,
    required: true,
  },
  taxtitle: {
    type: String,
    required: true,
  },
  taxrate: {
    type: String,
    required: true,
  },
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Tax = mongoose.model("taxe", userSchema);
module.exports = { Tax };
