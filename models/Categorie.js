const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  category_id: {
    type: String,
    required: true,
  },
  category_title: {
    type: String,
    required: true,
  },
  category_description: {
    type: String,
  },
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Categorie = mongoose.model('Categorie', userSchema);
module.exports = { Categorie };
