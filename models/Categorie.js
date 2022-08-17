const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  categorieid: {
    type: String,
    required: true,
  },
  categorietitle: {
    type: String,
    required: true,
  },
  categoriedescription: {
    type: String,
  },
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Categorie = mongoose.model("Categorie", userSchema);
module.exports = { Categorie };
