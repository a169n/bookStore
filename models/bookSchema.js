const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    publicationYear: Date,
    quantityAvailable: Number,
    price: Number,
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

module.exports = mongoose.model("Books", bookSchema);
