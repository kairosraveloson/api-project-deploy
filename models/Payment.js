const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  partner_store_id: String,
  store_id: String,
  payments: [
    {
      partner_payment_id: String,
      amount: String,
      tips: String,
      currency_code: String,
      placed_at: String,

      cart: {
        items: [
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

              return_status: String,
              refund_eater_id: [
                {
                  partner_refund_id: String,
                  partner_payment_id: String,
                  cart: {
                    items: [
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
                          description: String,
                          reason: String,
                          reason_code: String,
                          amount: {
                            value: String,
                            currency: String,
                          },
                          placed_at: String,
                          closed_at: String,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
});

const Payment = mongoose.model("Payment", userSchema);
module.exports = { Payment };
