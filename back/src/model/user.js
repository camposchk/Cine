const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  // isAdm: {
  //   type: Boolean,
  //   required: true
  // }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
