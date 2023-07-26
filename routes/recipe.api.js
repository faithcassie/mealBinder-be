var express = require("express");
const validators = require("../middlewares/validators");
const recipeController = require("../controllers/recipe.controller");
const authentication = require("../middlewares/authentication");
var router = express.Router();
const { body, param } = require("express-validator");

/**
 * @route POST /recipes
 * @description Add a new recipe
 * @body { title, ingredientList, instructions, tagList, imageURL }
 * @access Login required
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("title", "Missing Title").exists().notEmpty(),
    body("instructions", "Missing Instructions").exists().notEmpty(),
  ]),
  recipeController.addNewRecipe
);

/**
 * @route PUT /recipes/:id
 * @description Edit a recipe
 * @body { body }
 * @access Login required
 */

router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  recipeController.updateRecipe
);

/**
 * @route DELETE  /posts/:id
 * @description Delete a post
 * @access Login required
 */
// router.put(
//   "/:id",
//   authentication.loginRequired,
//   validators.validate([
//     param("id").exists().isString().custom(validators.checkObjectId),
//   ]),
//   recipeController.updateRecipe
// );

/**
 * @route GET /recipes/:id
 * @description View a recipe
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  recipeController.getRecipe
);

/**
 * @route GET /recipes/
 * @description View all recipes with filter
 * @access Login required
 */
router.get("/", authentication.loginRequired, recipeController.getAllRecipes);

/**
 * @route GET /recipes/:id/tags
 * @description Get tag list of a recipe
 * @access Login required
 */

router.get(
  "/:id/tags",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  recipeController.getTagssOfRecipe
);

/**
 * @route GET /recipes/:id/ingredients
 * @description Get ingredient of a recipe
 * @access Login required
 */

router.get(
  "/:id/ingredients",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  recipeController.getIngredientsofRecipe
);

module.exports = router;
