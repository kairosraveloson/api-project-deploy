const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetail = new Schema({
  id: String,
  display_id: String,
  external_reference_id: String,
  number: String,
  current_state: String,
  store: {
    id: String,
    name: String,
    partner_store_id: String,
    store_id: String,
    partner_table_id: String,
    venue_order_id: String,
    number_of_Guest_id: String,
    external_reference_id: String,
    integrator_store_id: String,
    integrator_brand_id: String,
    merchant_store_id: String,
  },
  eater: {
    first_name: String,
    phone: String,
    phone_code: String,
  },
  eaters: [
    {
      id: String,
      first_name: String,
    },
  ],

  cart: {
    items_list: [
      {
        id: String,
        instance_id: String,
        title: String,
        external_data: String,
        quantity: String,
        price: {
          unit_price: {
            amount: String,
            currency_code: String,
            formatted_amount: String,
          },
          total_price: {
            amount: String,
            currency_code: String,
            formatted_amount: String,
          },
          base_unit_price: {
            amount: String,
            currency_code: String,
            formatted_amount: String,
          },
          base_total_price: {
            amount: String,
            currency_code: String,
            formatted_amount: String,
          },
          taxInfo: {
            labels: Array,
          },
        },

        selected_modifier_groups: [
          {
            id: String,
            title: String,
            external_data: String,
            selected_items: [
              {
                id: String,
                title: String,
                external_data: String,
                quantity: String,
                price: {
                  unit_price: {
                    amount: String,
                    currency_code: String,
                    formatted_amount: String,
                  },
                  total_price: {
                    amount: String,
                    currency_code: String,
                    formatted_amount: String,
                  },
                  base_unit_price: {
                    amount: String,
                    currency_code: String,
                    formatted_amount: String,
                  },
                  base_total_price: {
                    amount: String,
                    currency_code: String,
                    formatted_amount: String,
                  },
                },
                default_quantity: String,
              },
            ],
            removed_items: String,
          },
        ],
        eater_id: String,
      },
    ],
  },
  employee_id: {
    employee_store_id: String,
    name_employee_id: String,
  },
  payment: {
    placed_at: String,
    closed_at: String,
    partner_payment_id: String,
    venue_payment_id: String,
    payment_type_id: String,
    tips: String,
    charges: {
      total: {
        amount: String,
        currency_code: String,
        formatted_amount: String,
      },
      sub_total: {
        amount: String,
        currency_code: String,
        formatted_amount: String,
      },
      tax: {
        amount: String,
        currency_code: String,
        formatted_amount: String,
      },
      total_fee: {
        amount: String,
        currency_code: String,
        formatted_amount: String,
      },
      cash_amount_due: {
        amount: String,
        currency_code: String,
        formatted_amount: String,
      },
    },

    /*  accounting: {
      taxRemittance: {
        tax: {
          paydoom: [
            {
              value: {
                amount: String,
                currencyCode: String,
                formatted_amount: String,
              },
            },
          ],

          destination: {
            country_iso2: String,
            id: String,
            postal_code: String,
          },
          origin: {
            country_iso2: String,
            id: String,
            postal_code: String,
          },
        },
      },
    },*/
  },
});

const Order_detail = mongoose.model("Order_detail", orderDetail);
module.exports = { Order_detail };
