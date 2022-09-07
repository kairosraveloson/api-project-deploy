const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  title: {
    description: {
      translations: Object,
    },
  },
});

const Categorie = mongoose.model("Categorie", userSchema);
module.exports = { Categorie };
