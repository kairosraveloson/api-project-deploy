const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(//Database name
    {
        e_mail:{
            type: String,
            required : true
        },
        password:{
            type: String,
            required:true
        },
        Date_creation:{
            type: Date,
            default: Date()
        }
    }
)



const User = mongoose.model('User',userSchema);
module.exports = { User };