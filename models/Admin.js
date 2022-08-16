const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(//Database name
    {
        AdminID:{
            type: String,
            required: true
        },
        e_mail:{
            type: String
        },
        password:{
            type: String
        },
        lastname:{
            type: String
        },
        firstname:{
            type: String
        },
        status_acces:{
            type: String,
            required: true
        },
        admin_image:{
            type: String
        },
        Date_creation:{
            type: Date,
            default: Date()
        }
    }
)



const Admin = mongoose.model('Admin',adminSchema);
module.exports = { Admin };