const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingreRecipeSchema = Schema({
  ingredient: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Ingredient",
  },
  recipe: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
});

const IngreRecipe = mongoose.model("IngreRecipe", ingreRecipeSchema);
module.exports = IngreRecipe;
