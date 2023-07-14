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
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Planner = mongoose.model("Planner", plannerSchema);
module.exports = Planner;
