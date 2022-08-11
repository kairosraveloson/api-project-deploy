const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(//Database name
    {
        status_acces:{
            type: String
        },
        lastname:{
            type: String
        },
        firstname:{
            type: String
        },
        e_mail:{
            type: String
        },
        password:{
            type: String
        }
    }
)



const User_admin = mongoose.model('User_admin',adminSchema);
module.exports = { User_admin };