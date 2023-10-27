<?php
// Отключаем вывод ошибок в браузер
error_reporting(0);
ini_set('display_errors', 0);

// Установка зависимостей
exec('npm install');

// Запускаем скрипт бота
exec('node main.js', $output);

// Выводим результат выполнения скрипта (если необходимо)
echo implode("\n", $output);
?>
