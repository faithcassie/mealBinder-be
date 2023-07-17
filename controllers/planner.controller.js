const mongoose = require("mongoose");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Planner = require("../models/Planner");

const plannerController = {};

plannerController.createNewPlan = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { mealList, date } = req.body;

  // find planner with {date}
  let planner = await Planner.findOne({ date })
    .populate({
      path: "mealList.recipe",
      select: "title imageUrl _id",
    })
    .exec();
  if (!planner) {
    planner = await Planner.create({
      mealList,
      date,
      author: currentUserId,
    })
      .populate({
        path: "mealList.recipe",
        select: "title imageUrl _id",
      })
      .exec();
  } else {
    // push mealList vao planner.mealList
    planner.mealList.push(...mealList);
    await planner.save();
  }

  planner = await planner.populate("mealList.recipe");

  return sendResponse(
    res,
    200,
    true,
    planner,
    null,
    "Create new plan successfully"
  );
});

plannerController.getPlannerByDate = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { date } = { ...req.query };
  // count total recipes here
  const author = new mongoose.Types.ObjectId(currentUserId);
  const mealCount = await Planner.aggregate([
    {
      $match: { author: author },
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $size: "$mealList" } },
      },
    },
  ]);

  let planner = await Planner.findOne({ date, author: currentUserId })
    .populate({
      path: "mealList.recipe",
      select: "title imageUrl _id",
    })
    .exec();
  if (!planner)
    throw new AppError(
      400,
      "Get planner not found",
      "Get planner by date error"
    );
  return sendResponse(
    res,
    200,
    true,
    { planner, mealCount: mealCount[0]?.total || 0 },
    null,
    "Get planner by date successfully"
  );
});

plannerController.updateMealList = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { recipeId, date } = req.body;

  let planner = await Planner.findOne({ date, author: currentUserId })
    .populate({
      path: "mealList.recipe",
      select: "title imageUrl _id",
    })
    .exec();

  if (!planner)
    throw new AppError(400, "Planner not found", "Update meal list error");

  //   planner.mealList.pull({ recipe: recipeId });

  planner.mealList = planner.mealList.filter(
    (meal) => meal.recipe._id.toString() !== recipeId
  );
  console.log(planner.mealList);
  await planner.save();

  return sendResponse(
    res,
    200,
    true,
    planner,
    null,
    "Update planner meal list successfully"
  );
});
module.exports = plannerController;
