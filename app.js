var express = require("express");
require("dotenv").config();
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
var indexRouter = require("./routes/index");
var app = express();

//passport google login
app.use(
  cookieSession({
    name: "session",
    keys: ["mealbinder"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // >?
app.use(cookieParser());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
const mongoose = require("mongoose");
const { sendResponse } = require("./helpers/utils");
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI).then(() => console.log("DB connect"));
// .catch((err) => console.log(err));

// Error handlers
// catch 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // console.log(("ERROR", err));
  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      err.errorType
    );
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});

module.exports = app;
