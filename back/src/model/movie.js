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
  rating:  [{
    userId: { type: String },
    stars: { type: Number, min: 1, max: 5 },
  }],
  launchDate: {
    type: Date,
    required: true,
  },
 
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.movieSchema = movieSchema;
