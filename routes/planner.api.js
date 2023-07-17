var express = require("express");
var router = express.Router();
const plannerController = require("../controllers/planner.controller");
const authentication = require("../middlewares/authentication");
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

/**
 * @route POST /planners
 * @description Add a new meal plan
 * @body { mealList, date }
 * @access Login required
 */

router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("mealList", "Missing mealList").exists().notEmpty(),
  ]),
  plannerController.createNewPlan
);

/**
 * @route GET /planners
 * @description Get planner by date
 * @body { date }
 * @access Login required
 */
router.get(
  "/",
  authentication.loginRequired,
  plannerController.getPlannerByDate
);

/**
 * @route GET /planners
 * @description Get planner by date
 * @body { date }
 * @access Login required
 */
router.put(
  "/",
  authentication.loginRequired,
  // validators.validate([
  //     body("recipeId", "Invalid recipeId")
  //     .exists()
  //     .custom(validators.checkObjectId),
  //   ]),
  plannerController.updateMealList
);

module.exports = router;
