var express = require("express");
var router = express.Router();

// authAPI
const authApi = require("./auth.api");
router.use("/auth", authApi);

// userAPI
const userApi = require("./user.api");
router.use("/users", userApi);

// recipeAPI
const recipeApi = require("./recipe.api");
router.use("/recipes", recipeApi);

// ingredientAPI
const ingredientApi = require("./ingredient.api");
router.use("/ingredients", ingredientApi);

// tagAPI
const tagApi = require("./tag.api");
router.use("/tags", tagApi);

// plannerAPI
const plannerApi = require("./planner.api");
router.use("/planners", plannerApi);

module.exports = router;
