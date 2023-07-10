const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = Schema(
  {
    title: { type: String, required: true },
    ingredientList: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
        },
        measurement: { type: String },
      },
    ],
    instructions: { type: String, required: true, default: "" },
    tagList: [
      {
        tag: {
          type: Schema.Types.ObjectId,
          required: false,
          ref: "Tag",
        },
      },
    ],
    imageUrl: { type: String, default: "" },
    author: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
