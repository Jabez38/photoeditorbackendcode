const mongoose = require("mongoose");



const imageSchema = mongoose.Schema({
  description: String,
  filename: String,
  path: String
});


module.exports = mongoose.model('Images', imageSchema, "images");