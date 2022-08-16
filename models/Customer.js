const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        customerID:{
            type: String,
            required : true
        },
        company_description:{
            type: String,
            required : true
        },
        firstname:{
            type: String
        },
        lastname:{
            type: String
        },
        e_mail:{
            type: String,
        },
        phone_one:{
            type: String,
        },
        phone_two:{
            type: String,
        },
        tax_identifier:{
            type: String,
        },
        adresse_one:{
            type: String,
        },
        adresse_two:{
            type: String,
        },
        zip_code:{
            type: String,
        },
        city_description:{
            type: String,
        },
        state_description:{
            type: String,
        },
        mail_notification:{
            type: Boolean
        },
        Date_creation:{
            type: Date,
            default: Date()
        }
    }
)



const Customer = mongoose.model('Customer',userSchema);
module.exports = { Customer };