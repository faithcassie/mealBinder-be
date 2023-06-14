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

// plannerAPI
const plannerApi = require("./planner.api");
router.use("/planner", plannerApi);

module.exports = router;
