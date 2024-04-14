# Makatels bot - miniApp

## Описание

Небольшой фронтенд для бота с потенциалом расширения функциональности. В текущей реализации проект получает разметку табличного сайта с расписанием автобусов, перерабатывает ее, и отображает данные в удобном интерфейсе c возможностью фильтрации. 

В проекте используются цвета и функционал, предоставляемые API Telegram Mini Apps. Документация [Telegram Mini Apps](https://core.telegram.org/bots/webapps)

Используемые технологии - TypeScript, CSS, React, Axios и пр.

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

### App

Верхний уровень приложения. 

  /providers - главные обертки и конфиги
    - router - конфиг роутинга приложения

  /styles - корневые стили 
    index.scss - корневой файл стилей приложения

  /types - декларации и объявление глобальных типов

App.tsx - корневой файл, над ним только root-обертки.

### Сущности (entities)

- [busRoute](/miniApp/src/entities/busRoute/README.md)

### Фичи (features)

- [getBusSchedule](/miniApp/src/features/getBusSchedule/README.md)

### Виджеты (widgets)

- [BusSchedule](/miniApp/src/widgets/BusSchedule/README.md)
- Header - Шапка приложения

### Страницы (pages)

### Shared

Общие компоненты, используемые по всему приложению. 

  /config - конфигурации
  /lib - библиотеки\хуки\хелперы\вспомогательные функции
  /ui - библиотека UI-компонентов

## Дополнительная информация

Проект задеплоен на [netlify](https://makatels.netlify.app)

----

Ссылка на эндпойнт, дёргающий парсинг разметки (воркараунд для CORS) - [__HTML_PARSER_API__](/miniApp/vite.config.ts) 