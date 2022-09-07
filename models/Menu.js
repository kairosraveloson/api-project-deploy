const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  items: [],
  modifier_groups: [],
  categories: [],
  menus: [
    {
      id: String,
      title: {
        translations: Object,
      },
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
      category_ids: [],
    },
  ],
  display_options: {},
});

const Menu = mongoose.model("Menu", userSchema);
module.exports = { Menu };
