var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");
const authentication = require("../middlewares/authentication");

/**
 * @route POST /users
 * @description Register new user
 * @body { name, email, password }
 * @access Public
 */
router.post(
  "/",
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  userController.register
);

/**
 * @route GET /users/:id
 * @description View user profile
 * @access Login required
 */
router.get(
  "/users/:id",
  authentication.loginRequired,
  userController.getCurrentUser
);

/**
 * @route PUT /users/:id
 * @description Update user profile
 * @body { body }
 * @access Login required
 */

/**
 * @route DELETE /users/:id
 * @description Delete user profile
 * @access Login required
 */

module.exports = router;
