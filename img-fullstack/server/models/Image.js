const mongoose = require("mongoose");

const ImgSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("image", ImgSchema);
