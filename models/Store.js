const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  //Database name
  store_id: String,
  name: String,
  location: {
    address: String,
    address_2: String,
    city: String,
    country: String,
    currency: String,
    postal_code: String,
    state: String,
    latitude: String,
    longitude: String,
  },
  contact_emails: Array,
  wifi: [
    {
      network: String,
      password: String,
    },
  ],
  raw_hero_url: String,
  price_bucket: String,
  avg_prep_time: String,
  status: String,
  merchant_store_id: String,
  timezone: String,
  web_url: String,
  web_facebook: String,
  web_instagram: String,
  web_tripadvisor: String,
  web_google: String,
  pos_data: {
    integration_enabled: Boolean,
    order_manager_client_id: String,
    integrator_store_id: String,
    integrator_brand_id: String,
    store_configuration_data: String,
    is_order_manager_pending: Boolean,
  },
  details_store: [
    {
      duns: String,
      ein: String,
      siret_fr: String,
      rcs_fr: String,
      vat: String,
    },
  ],
  Date_creation: {
    type: Date,
    default: Date(),
  },
});

const Store = mongoose.model("Store", storeSchema);
module.exports = { Store };
