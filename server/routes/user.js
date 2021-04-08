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
  if (req.headers.authorization === undefined) {
    res.status(403).json({ message: "Токен не распознан"});
  } else {
    const token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.Token, async function(err, decoded){
      if (err) {
        res.status(403).json({ message: "Токен неправильный" });
      }
      if (decoded.role !== "admin") {
        res.status(403).json({ message: "Нужны права администратора "});
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          login: req.body.login,
          name: req.body.name,
          password: hashedPassword,
          note: req.body.note,
          role: req.body.role
        });
        try {
          await user.save();
          req.status(201).json({ message: "Пользователь создан"});
        } catch (err) {
          res.status(500).json({ message: err.message});
        }
      }
    })
  }
});

module.exports = router;