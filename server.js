'use strict';

var fs = require('fs');
var path = require('path');

// Получаем доступ к Vue глобально для серверной версии app.js
global.Vue = require('vue');

// Получаем HTML-шаблон
var layout = fs.readFileSync('./index.html', 'utf8');

// Создаём рендерер
var renderer = require('vue-server-renderer').createRenderer();

// Создаём Express-сервер
var express = require('express');
var server = express();

// Включаем отдачу статических файлов из директории assets
server.use('/assets', express.static(
  path.resolve(__dirname, 'assets')
));

// Обрабатываем все GET-запросы
server.get('*', function (request, response) {
  // Рендерим наше приложение в строку
  renderer.renderToString(
    // Создаём экземпляр приложения
    require('./assets/app')(),

    // Обрабатываем результат рендеринга
    function (error, html) {

      // Если при рендеринге произошла ошибка...
      if (error) {
        // Логируем её в консоль
        console.error(error);
        // И говорим клиенту, что что-то пошло не так
        return response
          .status(500)
          .send('Server Error');
      }

      // Отсылаем HTML-шаблон, в который вставлен результат рендеринга приложения
      response.send(layout.replace('<div id="app"></div>', html));
    }
  )
})

// Слушаем 5000-й порт
server.listen(5000, function (error) {
  if (error) throw error;
  console.log('Server is running at localhost:5000');
})
