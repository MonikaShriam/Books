const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  Title: String,
  Author: String,
  Category: String,
  Published_Year: Number,
});

const Books_TB = mongoose.model("Books_TB", booksSchema);

module.exports = Books_TB;
