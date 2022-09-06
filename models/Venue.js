const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  venue_code_id: String,
  venue_api_key_id: String,
});

const Venue = mongoose.model('Venue', userSchema);
module.exports = { Venue };
