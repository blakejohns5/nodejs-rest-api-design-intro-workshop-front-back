const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  stats: {
    type: Object,
    default: {
      upVotes: 0,
      downVotes: 0,
    },
    upVotes: {
      type: Number,
    },
    downVotes: {
      type: Number,
    },
  },
});

const BookModel = new mongoose.model("book", BookSchema);

module.exports = BookModel;
