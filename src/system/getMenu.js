// Клавиатуры

export function getMainMenu() {
    return [
        [
            {
                text: '🎬  Видео',
                callback_data: 'movies'
            }
        ],
        [
            {
                text: '🚕 Такси',
                callback_data: 'taxi'
            }
        ],
        [
            {
                text: '📰  Другое',
                callback_data: 'additional'
            }
        ]
    ]
}

export function getVideoMenu() {
    return [
        [
            {
                text: '🎬  KINOLAND',
                callback_data: 'kinoland'
            }
        ],
        [
            {
                text: '🎬  HDREZKA',
                callback_data: 'hdrezka'
            }
        ],
        [
            {
                text: '<-- Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}

export function getVideoChoiceMenu(choiseOption) {
    switch (choiseOption) {
        case 'kinoland':
            return [
                [
                    {
                        text: '🎥  Открыть последний ссыль',
                        callback_data: 'checkLastReply'
                    }
                ],
                [
                    {
                        text: '📲  Обновить ссыль на зеркало',
                        callback_data: 'sendReq'
                    }
                ],
                [
                    {
                        text: '🔖  Ссыль не обновляется (репорт)',
                        callback_data: 'createTicket'
                    }
                ],
                [
                    {
                        text: '<- К предыдущему меню',
                        callback_data: 'movies'
                    }
                ],
                [
                    {
                        text: '<-- Вернуться в главное меню',
                        callback_data: 'mainMenu'
                    }
                ],
            ];
        case 'hdrezka' :
            return [
                [
                    {
                        text: '🎥  Открыть последний ссыль',
                        callback_data: 'checkLastReply'
                    }
                ],
                [
                    {
                        text: '📲  Обновить ссыль на зеркало',
                        callback_data: 'sendReq'
                    }
                ],
                [
                    {
                        text: '🔖  Ссыль не обновляется (репорт)',
                        callback_data: 'createTicket'
                    }
                ],
                [
                    {
                        text: '<- К предыдущему меню',
                        callback_data: 'movies'
                    }
                ],
                [
                    {
                        text: '<-- Вернуться в главное меню',
                        callback_data: 'mainMenu'
                    }
                ],
            ];
        default:
            return null;
    }
}

export function getGeneralTaxiMenu() {
    return [
        [
            {
                text: '🚖  Двигаемся по городу (Юг)',
                callback_data: 'taxiSouth'
            }
        ],
        [
            {
                text: '🚖  Двигаемся по городу (Север)',
                callback_data: 'taxiNorth'
            }
        ],
        [
            {
                text: '🚕  Заказываем такси онлайн',
                callback_data: 'taxiOnline'
            }
        ],
        [
            {
                text: '<-- Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}

export function getTaxiMenuSouth() {
    return [
        [
            {
                text: '🚖  Спутник (юг)',
                callback_data: 'tel:89501974244|Спутник (юг)'
            }
        ],
        [
            {
                text: '🚖  Регион (юг)',
                callback_data: 'tel:89506556526|Регион (юг)'
            }
        ],
        [
            {
                text: '🚖  Ямщик (юг)',
                callback_data: 'tel:89043825687|Ямщик (юг)'
            }
        ],
        [
            {
                text: '🚖  Максим (юг)',
                callback_data: 'tel:83435041616|Максим (юг)'
            }
        ],
        [
            {
                text: '🏎  Человек Смита -Втакси-',
                callback_data: 'tel:+79022725373|человеку Смита'
            }
        ],
        [
            {
                text: '<- К предыдущему меню',
                callback_data: 'taxi'
            }
        ],
        [
            {
                text: '<-- Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}

export function getTaxiMenuNorth() {
    return [
        [
            {
                text: '🚖  Вояж (север)',
                callback_data: 'tel:83435053335|Вояж (север)'
            }
        ],
        [
            {
                text: '🚖  Люкс (север)',
                callback_data: 'tel:89122206607|Люкс (север)'
            }
        ],
        [
            {
                text: '🚖  Регион (север)',
                callback_data: 'tel:89002036253|Регион (север)'
            }
        ],
        [
            {
                text: '🚖  Штурман (север)',
                callback_data: 'tel:83435031220|Штурман (север)'
            }
        ],
        [
            {
                text: '🏎  Человек Смита -Втакси-',
                callback_data: 'tel:+79022725373|человеку Смита'
            }
        ],
        [
            {
                text: '<- К предыдущему меню',
                callback_data: 'taxi'
            }
        ],
        [
            {
                text: '<-- Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}

export function getTaxiMenuOnline() {
    return [
        [
            {
                text: '🚕  Заказ онлайн (tg)',
                callback_data: 'link:https://t.me/polevskoy_taxi'
            }
        ],
        [
            {
                text: '🚕  Заказ онлайн 2 (tg)',
                callback_data: 'link:https://t.me/Polevskoy_Tax'
            }
        ],
        [
            {
                text: '🚕  Заказ онлайн 3 (vk)',
                callback_data: 'link:https://vk.me/join/z45V6aO7t4YiRArHfW7SiRWgr6RDeE_LTG4='
            }
        ],
        [
            {
                text: '<- К предыдущему меню',
                callback_data: 'taxi'
            }
        ],
        [
            {
                text: '<-- Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}

export function getAdditionalMenu() {
    return [
        [
            {
                text: '🚍 Расписание автобусов в Екб',
                callback_data: 'bus'
            }
        ],
        [
            {
                text: '🚌 Расписание автобусов из Екб',
                callback_data: 'busInverted'
            }
        ],
        [
            {
                text: '🗳️ Предложить функционал',
                callback_data: 'suggest'
            }
        ],
        [
            {
                text: '📬 Пожаловаться на работу бота',
                callback_data: 'report'
            }
        ],
        [
            {
                text: '<-- Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}
