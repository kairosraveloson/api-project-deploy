const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        item_reference:{
            type: String,
            required : true
        },
        item_designation:{
            type: String,
            required : true
        },
        item_type:{
            type: String, // Simple ou menu
            required : true
        },
        item_nomenclature:[
            {
                nomenclat_reference: {
                    type : String,
                },
                nomenclat_quantity: {
                    type: Integer,
                    format: int64
                }
            }
        ],
        item_category:{
            type: String,
        //    required: true
        }
    }
)



const Item = mongoose.model('Item',userSchema);
module.exports = { Item };