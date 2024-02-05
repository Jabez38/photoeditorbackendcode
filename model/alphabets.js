const mongoose = require("mongoose");


const imageSchema = mongoose.Schema({

  title: String,

  idname: String,

  filename: String,

  path: String,

  shareCount: { type: Number, default: 0 },

  likeCount: { type: Number, default: 0 },

});

module.exports = mongoose.model('alphabets', imageSchema, "alphabets");






