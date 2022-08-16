const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        categorieID:{
            type: String,
            required : true
        },
        categorieTitle:{
            type: String,
            required : true
        }
    }
)

s

const Categorie = mongoose.model('Categorie',userSchema);
module.exports = { Categorie };