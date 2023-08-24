const mongoose = require("mongoose");

const auth = new mongoose.Schema({
  _id: {type: String},
  password: {type: String},
  role: {type: String, enum: ['user', 'admin']},
});

module.exports = mongoose.model("Auth", auth);