const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = Schema(
  {
    title: { type: String, required: true },
    cookTime: { type: String, required: true, unique: true },
    measurement: { type: String, required: true },
    ingredients: [
      { type: Schema.Types.ObjectId, required: true, ref: "Ingredient" },
    ],
    instructions: { type: String, required: true },
    tags: {
      type: String,
      // enum: [
      //   "Favorite",
      //   "Dinner",
      //   "Lunch",
      //   "Breakfast",
      //   "Vegetarian",
      //   "Keto",
      //   "Snack",
      // ],
      required: false,
    },
    imageUrl: { type: String, required: false, default: "" },
    cuisine: {
      type: String,
      required: false,
      // enum: [
      //   "American Food",
      //   "Japanese Food",
      //   "French Food",
      //   "Italian Food",
      //   "Chinese Food",
      // ],
    },

    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
