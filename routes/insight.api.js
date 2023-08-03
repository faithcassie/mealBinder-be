var express = require("express");
const authentication = require("../middlewares/authentication");
var router = express.Router();
const insightController = require("../controllers/insight.controller");

/**
 * @route GET /insights/recipesbytag
 * @description Get recipe count by tags
 * @access Login required
 */

router.get(
  "/recipesbytag",
  authentication.loginRequired,
  insightController.getRecipeCountByTags
);

/**
 * @route GET /insights/mealsbydate
 * @description Get meal count by date
 * @access Login required
 */

router.get(
  "/mealsbydate",
  authentication.loginRequired,
  insightController.getMealsByDate
);

module.exports = router;
