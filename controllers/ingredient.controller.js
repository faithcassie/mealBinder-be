const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Ingredient = require("../models/Ingredient");

const ingredientController = {};

ingredientController.addNewIngredient = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { ingredientName } = req.body;

  let ingredient = await Ingredient.findOne({ ingredientName });
  if (ingredient)
    throw new AppError(400, "Ingredient exists", "Add ingredient error");
  const newIngredient = await Ingredient.create({
    ingredientName,
  });

  return sendResponse(
    res,
    200,
    true,
    newIngredient,
    null,
    "Create new ingredient successfully"
  );
});

ingredientController.getAllIngredients = catchAsync(async (req, res, next) => {
  const { ingredientName } = req.query;
  let searchCondition = {};
  if (ingredientName) {
    searchCondition.ingredientName = { $regex: ingredientName, $options: "i" };
  }

  let ingredients = await Ingredient.find(searchCondition);
  return sendResponse(
    res,
    200,
    true,
    ingredients,
    null,
    "Get ingredients successfully"
  );
});

module.exports = ingredientController;
