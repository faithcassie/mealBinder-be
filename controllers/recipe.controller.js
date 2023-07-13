const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

const recipeController = {};

recipeController.getAllRecipes = catchAsync(async (req, res, next) => {
  let { page, limit, tag, name } = { ...req.query };

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  let offset = limit * (page - 1);
  let filter = [];
  if (name) {
    filter.push({
      title: { $regex: new RegExp(name, "i") },
    });
  }
  if (tag) {
    filter.push({ "tagList.tag": tag });
  }
  const fillterCriteria = filter.length ? { $and: filter } : {};

  let recipes = await Recipe.find(fillterCriteria)
    .skip(offset)
    .limit(limit)
    .populate("tagList.tag");

  const count = await Recipe.countDocuments(fillterCriteria);
  const totalPage = Math.ceil(count / limit);
  return sendResponse(
    res,
    200,
    true,
    { recipes, count, totalPage },
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

recipeController.updateRecipe = catchAsync(async (req, res, next) => {
  const recipeId = req.params.id;
  const { title, ingredientList, instructions, tagList, imageUrl } = req.body;
  let recipe = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { title, ingredientList, instructions, tagList, imageUrl },
    { new: true }
  )
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
    "Update recipe successfully"
  );
});
recipeController.getTagssOfRecipe = catchAsync(async (req, res, next) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId, "tagList.tag")
    .populate("tagList.tag")
    .exec();
  if (!recipe) throw new AppError(400, "Recipe not found", "Get tags error");
  const tagList = recipe.tagList.map((tag) => tag.tag.tag);

  return sendResponse(res, 200, true, tagList, null, "Get tags successfully");
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
}); // no use

module.exports = recipeController;
