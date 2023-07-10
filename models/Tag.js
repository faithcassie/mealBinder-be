const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = Schema(
  {
    tag: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
