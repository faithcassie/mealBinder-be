var express = require("express");
const validators = require("../middlewares/validators");
const authentication = require("../middlewares/authentication");
var router = express.Router();
const { body, param } = require("express-validator");
const tagController = require("../controllers/tag.controller");

/**
 * @route POST /tags
 * @description Add a new tag
 * @body { tag }
 * @access Login required
 */

router.post(
  "/",
  authentication.loginRequired,
  validators.validate([body("tag", "Missing Tag").exists().notEmpty()]),
  tagController.addNewTag
);

/**
 * @route GET /tags
 * @description Get all tags
 * @access Login required
 */

router.get("/", authentication.loginRequired, tagController.getAllTags);

module.exports = router;
