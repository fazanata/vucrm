// Маршруты для модели Category для обработки запросов с фронта
const express = require("express");
const router = express.Router();
const Category = require("../model/category");

//Вывод всех динамических страниц сайта.
router.get("/", async (req, res) => {
  try {
    // Выбираем только нужны поля, чтобы в запросе не передавались лишние данные
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    // Если возникает проблема, то возвращаем ошибку сервера
    res.status(500).json({ message: err.message });
  }
});

// Получает контент конкретной категории. Выносим повторяющиеся действия в функцию getContentCategory для упрощения кода
router.get("/:url", getCategory, (req, res) => {
  res.json(res.category);
});

// Публикация новой категории 
router.post("/", async (req, res) => {
  const category = new Category({
    h1: req.body.h1,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    content: req.body.content,
  });
  try {
    await category.save();
    res.status(200).json({ message: "Категория создана" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Обновление контента конкретной категории
router.patch("/:url", getCategory, async (req, res) => {
  try {
    Object.assign(res.category, req.body);
    await res.category.save();
    res.status(200).json({ message: "Страница категории обновлена" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Удаление конкретной категории
router.delete("/:url", getCategory, async (req, res) => {
  try {
    await res.category.remove();
    res.status(200).json({ message: "Страница удалена" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Функция для поиска конкретной страницы по URL.
async function getCategory(req, res, next) {
  try {
    // Ищем страницу по URL, который указан в строке запроса.
    const category = await Category.findOne({ url: req.params.url }).exec();
    if (category === null) {
      // Возвращаем 404 ответ сервера, если страница не найдена.
      return res.status(404).json({ message: "Категории не существует" });
    } else {
      // Передаём контент страницы, если URL найден.
      res.category = category;
      next();
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;