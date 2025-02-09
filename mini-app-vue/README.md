![Axios](https://img.shields.io/badge/Axios-1.6.8-red)
![Cheerio](https://img.shields.io/badge/Cheerio-1.0.0--rc.12-orange)
![Vue](https://img.shields.io/badge/Vue-3.2.13-green)
![Vue Router](https://img.shields.io/badge/Vue_Router-4.0.3-blue)
![Vuex](https://img.shields.io/badge/Vuex-4.0.0-purple)
![Core.js](https://img.shields.io/badge/Core.js-3.8.3-yellow)
![Ngrok](https://img.shields.io/badge/Ngrok-5.0.0--beta.2-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)
![ESLint](https://img.shields.io/badge/ESLint-7.32.0-lightgrey)
![Prettier](https://img.shields.io/badge/Prettier-2.4.1-pink)
![Telegram WebApps](https://img.shields.io/badge/Telegram_WebApps-7.0.0-blue)


# Makatels bot - miniApp (VUE)

## Описание

Небольшой фронтенд для бота с потенциалом расширения функциональности. В текущей реализации проект получает разметку табличного сайта с расписанием автобусов, перерабатывает ее, и отображает данные в удобном интерфейсе c возможностью фильтрации. 

В проекте используются цвета и функционал, предоставляемые API Telegram Mini Apps. Документация [Telegram Mini Apps](https://core.telegram.org/bots/webapps)

Используемые технологии - TypeScript, CSS, VUE, Axios и пр.

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run dev - запускаем проект в dev режиме
npm run start:bridge - запускаем мост для разрработки (отображение изменений в реал-тайме в боте)

Копируем ссылку моста из консоли ngrok (из запуска последней команды) и вставляем её в /tgBot/src/config/config.ts в константу frontendLink (ссылка меняется каждый раз при перезапуске ngrok)
```

## Архитектура проекта

Проект написан в соответствии с методологией Feature Sliced Design
Ссылка на документацию - [FSD](https://feature-sliced.design/docs/get-started/tutorial)


## Дополнительная информация

Проект задеплоен на [netlify](https://makatels-vue.netlify.app/)
