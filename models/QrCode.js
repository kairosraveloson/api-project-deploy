const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  frame_name: String,
  qr_code_link: String,
  image_format: String,
  qr_code_number: String,
});

const QrCode = mongoose.model("qrcode", userSchema);
module.exports = { QrCode };
