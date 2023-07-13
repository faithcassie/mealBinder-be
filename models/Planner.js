const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plannerSchema = Schema(
  {
    mealList: [
      {
        recipe: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Recipe",
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    // author ?
  },
  { timestamps: true }
);
