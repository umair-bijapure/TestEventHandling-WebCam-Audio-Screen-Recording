const mongoose = require("mongoose");

const user = new mongoose.Schema({
  _id: {type: String},
  name: {type: String},
  email: {type: String}

});

module.exports = mongoose.model("User", user);