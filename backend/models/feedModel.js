const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  created_by:{
    type:String,
    trim:true,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_collection', 
  },
  
});



module.exports = mongoose.model("feeds", feedSchema);