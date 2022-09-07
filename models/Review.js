const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  store_id: String,
  first_name: String,
  last_name: String,
  email: String,
  phone_number: String,
  rating: String,
  rating_rate: String,
  date_of_birth: String,
});

const Review = mongoose.model('Review', userSchema);
module.exports = { Review };
