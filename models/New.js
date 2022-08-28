const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //Database name
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const New = mongoose.model("New", userSchema);
module.exports = { New };
