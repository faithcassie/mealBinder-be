const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = Schema(
  {
    ingredientName: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;
