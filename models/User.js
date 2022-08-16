const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(//Database name
    {
        userID:{
            type: String,
            required: true
        },
        e_mail:{
            type: String,
            required : true
        },
        password:{
            type: String,
            required:true
        },
        firstname:{
            type: String
        },
        lastname:{
            type: String
        },
        Date_creation:{
            type: Date,
            default: Date()
        }
    }
)



const User = mongoose.model('User',userSchema);
module.exports = { User };