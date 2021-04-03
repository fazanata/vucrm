const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Описываем модель Request. То есть из чего состоит динамическая страница сайта

  name: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,  
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
      //admin, manager, worker
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);