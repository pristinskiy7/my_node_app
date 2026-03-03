const express = require('express'); // Подключаем библиотеку express
const app = express();              // Создаем приложение
const port = process.env.PORT || 3000;                // Номер порта

// Говорим серверу: "Если кто-то зайдет на главную страницу (/) — ответь Приветом"
app.get('/', (req, res) => {
  res.send('<h1>Поздравляю! Твой сервер работает.</h1><p>Это страница на Node.js</p>');
});

// Запускаем сервер на прослушивание порта
app.listen(port, () => {
  console.log(`Сервер запущен! Перейди сюда: http://localhost:${port}`);
});