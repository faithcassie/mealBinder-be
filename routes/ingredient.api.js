var express = require("express");
const validators = require("../middlewares/validators");
const ingredientController = require("../controllers/ingredient.controller");
const authentication = require("../middlewares/authentication");
var router = express.Router();
const { body, param } = require("express-validator");

/**
 * @route POST /ingredients
 * @description Add a new ingredient
 * @body { ingredientName }
 * @access Login required
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("ingredientName", "Missing Name Value").exists().notEmpty(),
  ]),

  ingredientController.addNewIngredient
);

/**
 * @route GET /ingredients
 * @description Get ingredient list
 * @body { ingredientName } ?
 * @access Login required
 */

router.get(
  "/",
  authentication.loginRequired,
  ingredientController.getAllIngredients
);

module.exports = router;
