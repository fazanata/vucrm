require("dotenv").config();

// Подключаем бэкенд на Express.
const express = require("express");
const app = express();
app.use(express.json());

// Подключаем Mongoose и делаем коннект к базе данных.
// Прописываем стандартные настройки Mongoose.
const mongoose = require("mongoose");
mongoose.Schema.Types.Boolean.convertToFalse.add("");


mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


const pageRoutes = require("./routes/page");
const requestRoutes = require("./routes/request");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/user");

app.use("/api/request", requestRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/user", userRoutes);



// Подключаем Nuxt в режиме nuxt.render. В этом примере нет отдельного процесса с Nuxt.
// Nuxt работает в качестве middleware для Express без своего сервера на Connect.
const { loadNuxt, build } = require("nuxt");
const isDev = process.env.NODE_ENV !== "production";
async function start() {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");
  app.use(nuxt.render);
  if (isDev) {
    build(nuxt);
  }
  app.listen(process.env.PORT);
}

// Запуск приложения.
start();
