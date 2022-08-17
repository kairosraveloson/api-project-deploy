const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  menuid: String,
  image_url: String,
  title: {
    translations: Object,
  },
  list_items: [
    {
      item_id: String,
      item_quantity: String,
      quantity_type: String,
      max_permitted: String,
    },
  ],
  categorie: Array,
  diplay_options: Object,
  service_availability: [
    {
      day_of_week: String,
      time_periods: [
        {
          start_time: String,
          end_time: String,
        },
      ],
    },
  ],
  price_info: {
    price_ht: String,
    price_ttc: String,
    price_cost: String,
  },
  tax_info: {
    tax_id: String,
    tax_rate: String,
  },
  authorize_change: false,
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Menu = mongoose.model("Menu", userSchema);
module.exports = { Menu };
