const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  itemid: String,
  image_url: String,
  item_type: String, // item or menu
  description: {
    translations: Object,
  },
  title: {
    translations: Object,
  },
  list_items: [
    {
      item_id: String,
      item_quantity: String,
      quantity_type: String,
      max_permitted: String,
      is_main: Boolean,
    },
  ],
  suspension_info: Array,
  categories: {
    categories_id: String,
  },
  categories_menu: Array, // many categories is possible for the menu
  diplay_options: Object, // menu
  service_availability: [
    //menu
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
  entities: [
    {
      entities_type: String,
      entities_id: String,
    },
  ],
  storage_info: {
    min_stock: String,
    max_stock: String,
    current_stock: String,
  },
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
  authorize_change: false,
  qr_code: String,
  item_discount: String,
  item_preparation: String,
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Item = mongoose.model("Item", userSchema);
module.exports = { Item };
