const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: String,
    bookId: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
