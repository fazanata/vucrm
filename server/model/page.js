const mongoose = require("mongoose");
const path = require("path");

const coverImageBasePath = "uploads/page";

const pageSchema = new mongoose.Schema({
  // Описываем модель Page. То есть из чего состоит динамическая страница сайта.

  url: {
    // Например, адрес страницы является строкой. Он обязателен и должен быть уникальным.
    type: String,
    unique: true,
    required: true,
  },
  h1: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
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
  createdDate: {
    // У каждой страницы автоматически сохраняется дата создания.
    type: Date,
    default: Date.now,
  },
  category: {
    //категория страницы
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },
  coverImageName: {}
});

pageSchema.virtual("coverImagePath").get(function(){
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName);
  }
});

module.exports = mongoose.model("Page", pageSchema);
