const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Planner = require("../models/Planner");

const plannerController = {};

plannerController.createNewPlan = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { mealList, date } = req.body;

  // find planner with {date}
  let planner = await Planner.findOne({ date });
  if (!planner) {
    planner = await Planner.create({
      mealList,
      date,
      author: currentUserId,
    });
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
  const { date } = req.body;
  let planner = await Planner.findOne({ date });
  if (!planner)
    throw new AppError(400, "Planner not found", "Get recipe by date error");

  return sendResponse(
    res,
    200,
    true,
    planner,
    null,
    "Get planner by date successfully"
  );
});
module.exports = plannerController;
