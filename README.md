![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3%20|%205.2.2-blue)
![Express](https://img.shields.io/badge/Express-4.19.2-purple)
![Vue](https://img.shields.io/badge/Vue-3.2.0-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node Telegram Bot API](https://img.shields.io/badge/Node_Telegram_Bot_API-0.61.0-blue)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9.4-orange)

# 🤖 TELEGRAM BOT

## 📝 Описание

Телеграм бот предоставляет следующие возможности:

- Получение и обновление уникальных ссылок на сайты с фильмами без прав на прокат: Пользователи могут получать актуальные ссылки на ресурсы для просмотра фильмов.

- Отображение актуальных сервисов такси в Полевском: Бот предоставляет информацию о доступных сервисах такси в городе Полевской.

- Мини-приложение "Расписание автобусов": Возможность просмотра расписания автобусов по маршруту "Полевской - Екатеринбург" и обратно, включая время отправления, прибытия и промежуточные остановки.

- Обратная связь: Пользователи могут сообщать о проблемах в работе бота или предлагать новый функционал.

## 📸 Скриншоты

### Главная страница
[![Главная страница](./public/screenshots/Main.png)](./public/screenshots/Main.png)

### Выбор видеосервиса
[![Выбор видеосервиса](./public/screenshots/Video.png)](./public/screenshots/Video.png)

### Видеосервис
[![Видеосервис](./public/screenshots/HDREZKA.png)](./public/screenshots/HDREZKA.png)

### Выбор сервиса такси
[![Выбор сервиса такси](./public/screenshots/Taxi.png)](./public/screenshots/Taxi.png)

### Такси
[![Такси](./public/screenshots/TaxiSouth.png)](./public/screenshots/TaxiSouth.png)

### Другие сервисы
[![Другие сервисы](./public/screenshots/Additional.png)](./public/screenshots/Additional.png)

### Расписание автобусов
[![Расписание автобусов](./public/screenshots/MiniApp.png)](./public/screenshots/MiniApp.png)

## 📂 Структура проекта

### 🔧 html-parser
Сервер с парсингом расписания автобусов - [Подробнее](/html-parser/README.md)

### 🖥️ miniApp (VUE)
Фронтенд "Расписание автобусов" на Vue.js - [Подробнее](/mini-app-vue/README.md)

### 🖥️ miniApp (React)
Альтернативная версия фронтенда "Расписание автобусов" на React - [Подробнее](/miniApp/README.md)

### ⚙️ tgBot
Логика бота, реализованная с использованием объектно-ориентированного подхода - [Подробнее](/tgBot/README.md)

## 🚀 Технологии

Backend: Node.js, Express
Frontend: Vue.js, React
Парсинг: Cheerio
Бот: Node Telegram Bot API
Email-уведомления: Nodemailer
