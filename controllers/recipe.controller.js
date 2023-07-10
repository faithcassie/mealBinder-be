const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

const recipeController = {};

recipeController.getAllRecipes = catchAsync(async (req, res, next) => {
  // const currentUserId = req.userId;
  let { page, limit, ...filter } = { ...req.query };

  // let user = await User.findById(currentUserId);
  // if (!user) throw new AppError(400, "User not found", "Get All Recipes Error");
  page = parseInt(page) || 1;
  limit = parseInt(page) || 10;

  let recipes = await Recipe.find();

  const count = await Recipe.countDocuments({});

  return sendResponse(
    res,
    200,
    true,
    recipes,
    null,
    "Get all recipes successfully"
  );
});

recipeController.getRecipe = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  let recipe = await Recipe.findById(id)
    .populate("ingredientList.ingredient")
    .populate("tagList.tag");
  if (!recipe)
    throw new AppError(400, "Recipe not found", "Get recipe details error");

  return sendResponse(
    res,
    200,
    true,
    recipe,
    null,
    "Get new recipe successfully"
  );
});

recipeController.addNewRecipe = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { title, ingredientList, instructions, tagList, imageUrl } = req.body;
  let recipe = await Recipe.create({
    title,
    ingredientList,
    instructions,
    tagList,
    imageUrl,
    author: currentUserId,
  });
  return sendResponse(
    res,
    200,
    true,
    recipe,
    null,
    "Create new recipe successfully"
  );
});

recipeController.getIngredientsofRecipe = catchAsync(async (req, res, next) => {
  const recipeId = req.params.id;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe)
    throw new AppError(400, "Recipe not found", "Get ingredients error");

  const count = await Ingredient.countDocuments({ recipe: recipeId });

  const ingredients = await Ingredient.find({ recipe: recipeId });

  return sendResponse(
    res,
    200,
    true,
    { ingredients, count },
    null,
    "Get ingredients successfully"
  );
});

module.exports = recipeController;
