// Маршруты для модели Page для обработки запросов с фронта.
const express = require("express");
const router = express.Router();
const Request = require("../model/request");

//Вывод всех заявок
router.get("/", async (req, res) => {
  try {
    // Выбираем только нужные поля, чтобы в запросе не передавались лишние данные
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    // Если возникает проблема, то возвращаем ошибку сервера.
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const request = new Request({
    name: req.body.name,
    adres: req.body.adres,
    mobile: req.body.mobile,
    description: req.body.description,
    content: req.body.content,
  });
  try {
    await request.save();
    res.status(200).json({ message: "Заявка создана" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
