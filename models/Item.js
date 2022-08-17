const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  itemid: String,
  image_url: String,
  description: {
    translations: Object,
  },
  title: {
    translations: Object,
  },
  suspension_info: Array,
  categories: {
    categories_id: String,
  },
  entities: [
    {
      entities_type: String,
      entities_id: String,
    },
  ],
  price_info: {
    price_take_away: String,
    price_ht: String,
    price_ttc: String,
    price_cost: String,
    overrides: [],
  },
  tax_info: {
    tax_id: String,
    tax_rate: String,
    vat_rate_percentage: String,
  },
  nutritional_info: {
    kilojoules: String,
    calories: String,
  },
  dish_info: {
    classifications: {
      instructions_for_use: String,
      ingredients: Array,
      dietary_label_info: {
        dietary_label_info_labels: Array,
      },
    },
  },
  beverage_info: {
    caffeine_amount: String,
    alcohol_by_volume: String,
    coffee_info: {
      coffee_bean_origin: Array,
    },
  },
  product_info: {
    product_type: String,
    product_traits: String,
    product_info: {
      target_market: String,
      gtin: String,
    },
  },
  external_id: String,
  external_data: String,
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Item = mongoose.model("Item", userSchema);
module.exports = { Item };
