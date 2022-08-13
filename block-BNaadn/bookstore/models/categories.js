const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    type: { type: String, required: true },
    bookId: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
