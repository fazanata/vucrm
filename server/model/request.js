const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  // Описываем модель Request. То есть из чего состоит динамическая страница сайта

  name: {
    // Например, адрес страницы является строкой. Он обязателен и должен быть уникальным.
    type: String,
    required: true,
  },
  adres: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
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
    // У каждой заявки автоматически сохраняется дата создания.
    type: Date,
    default: Date.now,
  },
  state: {
    //состояние 0 - открыта, 1 - назначена монтажнику, 2 - в работе, 3 - закрыта(успешно выполнена), 4 - закрыта(не исполнена)
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Request", requestSchema);
