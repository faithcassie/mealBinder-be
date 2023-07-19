const mongoose = require("mongoose");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Recipe = require("../models/Recipe");
const Planner = require("../models/Planner");

const insightController = {};

insightController.getRecipeCountByTags = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const author = new mongoose.Types.ObjectId(currentUserId);

  const count = await Recipe.aggregate([
    {
      $match: {
        author: author,
      },
    },
    {
      $unwind: {
        path: "$tagList",
      },
    },
    {
      $group: {
        _id: "$tagList.tag",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "_id",
        foreignField: "_id",
        as: "result",
      },
    },
    {
      $group: {
        _id: null,
        totalCount: {
          $sum: "$count",
        },
        tags: {
          $push: {
            tag: "$_id",
            count: "$count",
            name: {
              $first: "$result",
            },
          },
        },
      },
    },
  ]);
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push(count[0].tags[i]);
    count[0].totalCount -= count[0].tags[i].count;
  }

  result.push({
    count: count[0].totalCount,
    name: {
      tag: "others",
    },
  });

  return sendResponse(
    res,
    200,
    true,
    result,
    null,
    "Get recipe count by tags successfully"
  );
});

insightController.getMealsByDate = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const author = new mongoose.Types.ObjectId(currentUserId);

  const data = await Planner.aggregate([
    {
      $match: {
        author: author,
      },
    },
    {
      $unwind: {
        path: "$mealList",
      },
    },
    {
      $group: {
        _id: {
          $substr: ["$date", 5, 5],
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  const lastSevenDays = data.slice(-7);
  console.log(lastSevenDays);

  return sendResponse(
    res,
    200,
    true,
    lastSevenDays,
    null,
    "Get meal count by date successfully"
  );
});

module.exports = insightController;
