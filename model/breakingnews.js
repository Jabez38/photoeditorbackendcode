const mongoose = require("mongoose");




const imageSchema = mongoose.Schema({

  title: String,

  shortdescription: String,

  longdescription: String,

  filename: String,

  path: String

});




module.exports = mongoose.model('breakingnews', imageSchema, "breakingnews");


