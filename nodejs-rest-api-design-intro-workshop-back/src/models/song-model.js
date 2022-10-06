const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    stats: {
      type: Object,
      default: {
        timesPlayed: 0,
        upVotes: 0,
        downVotes: 0,
      },
      timesPlayed: Number,
      upVotes: Number,
      downVotes: Number,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true },
);

const SongModel = new mongoose.model("song", SongSchema);

module.exports = SongModel;
