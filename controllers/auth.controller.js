const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email }, "+password");
  if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError(400, "Wrong Password", "Login Error");
  const accessToken = await user.generateToken();

  sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successfully"
  );
});

module.exports = authController;
