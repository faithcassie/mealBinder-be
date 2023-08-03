const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Tag = require("../models/Tag");

const tagController = {};

tagController.addNewTag = catchAsync(async (req, res, next) => {
  const { tag } = req.body;

  let tagData = await Tag.findOne({ tag });
  if (tagData) throw new AppError(400, "Tag exists", "Add tag error");
  const newTag = await Tag.create({ tag });

  return sendResponse(
    res,
    200,
    true,
    newTag,
    null,
    "Create new tag successfully"
  );
});

tagController.getAllTags = catchAsync(async (req, res, next) => {
  const { tag } = req.body;
  let searchCondition = {};
  if (tag) {
    searchCondition.tag = { $regex: tag, $options: "i" };
  }

  let allTags = await Tag.find(searchCondition).sort({ tag: 1 });

  return sendResponse(
    res,
    200,
    true,
    allTags,
    null,
    "Get all tags successfully"
  );
});

module.exports = tagController;
