const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  item_principal: String,
  options_items: [
    {
      id: String,
      quantity: String,
    },
  ],
});

const Option = mongoose.model("Option", userSchema);
module.exports = { Option };
