var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const validators = require("../middlewares/validators");
const passport = require("passport");

/**
 * @route POST /auth/login
 * @description Log in with username and password
 * @body { email, password }
 * @access Public
 */
router.post(
  "/login",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  authController.loginWithEmail
);

/**
 * @route GET /login/success
 * @description Log in with google success
 */
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

/**
 * @route GET /login/failed
 * @description Log in with google FAILED
 */
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @route GET /auth/google/callback
 * @description Log in with google
 */
router.get(
  "/google/callback",
  passport.authenticate("google"),
  // {
  //   successRedirect: process.env.CLIENT_URL,
  //   failureRedirect: "/login/failed",
  // },
  async (req, res) => {
    if (req && req.user && req.user.accessToken) {
      const accessToken = await req.user.user.generateToken();
      res.redirect(`${process.env.CLIENT_URL}/?accessToken=${accessToken}`);
    } else {
      req.redirect("/login/failed");
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.json("Redirect");
});

// router.get("/logout", (req, res) => {
//   console.log("testing logout");
//   req.logout({}, (err) => {
//     console.log(err);
//     if (err) return res.status(500).json({ message: "Something went wrong." });
//     res.redirect(process.env.CLIENT_URL);
//   });
// });

module.exports = router;
