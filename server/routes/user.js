// Маршруты для модели Manager для обработки запросов с фронта.
const express = require("express");
const router = express.Router();
const User = require("../model/user");

//Вывод всех заявок
router.get("/", async (req, res) => {
  try {
    // Выбираем только нужные поля, чтобы в запросе не передавались лишние данные
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    // Если возникает проблема, то возвращаем ошибку сервера.
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    login: req.body.login,
    password: req.body.password,
    note: req.body.note,
    role: req.body.role,
  });
  try {
    await user.save();
    res.status(200).json({ message: "Пользователь создан" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;