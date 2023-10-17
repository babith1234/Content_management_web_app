const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phone_number: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
  },
  email_id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  profile_pic: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("user_collection", userSchema);
