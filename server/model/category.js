const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  // Описываем модель Request. То есть из чего состоит динамическая страница сайта

  title: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,  
    unique: true,
  },
  h1: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  /*
  parent: {
    //родительская категория 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },*/
});

module.exports = mongoose.model("Category", categorySchema);