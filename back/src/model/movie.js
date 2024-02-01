const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  launchDate: {
    type: Date,
    required: true,
  }
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.movieSchema = movieSchema;
